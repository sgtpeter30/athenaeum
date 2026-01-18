import { Component, Input, Type, ViewChild, ViewEncapsulation, inject, signal } from '@angular/core';
import { Book, emptyBook, ExternalBook } from 'src/shared/models';
import { TranslationService } from 'src/shared/services';
import { ISBNService } from '../../isbn-service/isbn.service';
import { LiveFormComponent, LiveFormBuilder, LiveFormModel, CheckboxFieldComponent, SelectField, LiveFormGroup } from '@props-and-tinkering/pt-core';
import { Field, form } from '@angular/forms/signals';
import { OptionModel } from 'src/shared/models/options.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface LoginForm {
  email: string,
  password: string
}

@Component({
  selector: 'app-merge-data-form',
  imports: [
    CommonModule,
    LiveFormComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './merge-data-form.component.html',
  styleUrl: './merge-data-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MergeDataFormComponent {
  liveFormSignal = signal<LoginForm>({
    email: '',
    password: ''
  })
  liveForm = form<LoginForm>(this.liveFormSignal)

  private isbnService = inject(ISBNService)
  translateService = inject(TranslationService)
  isBookKey = (k: keyof ExternalBook): k is keyof Book => k !== 'selected' && k !== 'source';

  lfb = new LiveFormBuilder()
  getInitValues(){
    const initValues =  this.isbnService.externalBookList().find(item => item.selected);
    console.log('initValues', initValues);
    // todo clear object from additional values - usuń pola specyficzne dla ExternalBook
    const returnBook = this.isbnService.externalBookList().find(item => item.selected);
    let tempValues
    if(!returnBook){
      tempValues = emptyBook
    }else{
      const {source, selected, ...rest} = returnBook;
      tempValues = rest as Book
    }
    
    let finalValues:any = {}
    Object.entries(tempValues).forEach(([key, value], index)=> {
      finalValues[`${key}_include`] = true;
      finalValues[key] = value;
    })
    console.log('finalValues', finalValues);
    
    return finalValues
    // return this.isbnService.externalBookList().find(item => item.selected) || emptyBook
  }
  mergeBookSignal = signal<Partial<ExternalBook>>(this.getInitValues())
  mergeBookHTML: LiveFormModel<Partial<ExternalBook>> = {
    name: 'mergeBookForm',
    // controls: this.lfb.group<Partial<ExternalBook>>(this.generateGroupsFromData(booksArray)),
    controls: this.generateGroupsFromData(this.isbnService.externalBookList()),
  }
  mergeBookForm = form(this.mergeBookSignal)

  getMappedValue(name: any, booksArray: any[]): OptionModel[] {
    if (booksArray) {
      const uniqueValues = new Set(booksArray.map(e => e[name]))
      const options = Array.from(uniqueValues).map(item => {
        if (typeof item !== "undefined") {
          return {
            label: item,
            value: item
          }
        }
        return
      })
      return options.filter(element => element) as OptionModel[]
    }
    return []
  }

  generateGroupsFromData(booksArray: Book[]) {
    // console.log("booksArray: ",booksArray);
    
    if (booksArray) {
      const finalObj: any = {};
      const uniqueKeys = new Set(booksArray.reduce((acc, book) => {
        Object.keys(book).forEach(key => acc.add(key));
        return acc;
      }, new Set()));

      let uniqueKeysArray = [...uniqueKeys] as (keyof ExternalBook)[]
      // najpierw jako klucze ExternalBook, potem zawężamy do keyof Book

      // usuń pola specyficzne dla ExternalBook
      const bookKeysArray = uniqueKeysArray.filter(this.isBookKey) as (keyof Book)[];
      // console.log('bookKeysArray', bookKeysArray);

      // bookKeysArray.forEach((key: keyof Book) => {
      bookKeysArray.forEach((key: keyof Book) => {

        finalObj[`${key}_include`] = this.lfb.controls({
          component: CheckboxFieldComponent,
        })

        const sample = booksArray.find(item => typeof item[key] !== 'undefined' && item[key] !== null);
        const sampleValue = sample?.[key];
        finalObj[key] = this.lfb.controls({
          label: this.translateService.getTranslations(`book.${key}`),
          component: SelectField,
          options: this.getMappedValue(key, booksArray)
        })
        // todo do it after adding second level group in form-builder
        if (typeof sampleValue !== "object") {
          // item
          finalObj[key] = this.lfb.controls({
            label: this.translateService.getTranslations(`book.${key}`),
            component: SelectField,
            options: this.getMappedValue(key, booksArray)
          })
        } else {
          //! second level Object
          console.log(key, typeof sampleValue, sampleValue);
          console.log("-----------------------------------------------------------------------------")
          console.log(sampleValue)
          const insideKeys = Object.keys(sampleValue as Object)
          // .forEach(key => acc.add(key));
          const secondLevelValues = booksArray.map(e => e[key])
          console.log("secondLevelValues")
          console.log(secondLevelValues)
          const formGroupSecondLevel: Record<string, any> = {}

          insideKeys.forEach(insideKey => {
            console.log(insideKey)
            console.log(this.translateService.getTranslations(`book.${insideKey}`),)
            // let groupObj:LiveFormGroup<any> = {
            //   [insideKey]: 
            // }
            formGroupSecondLevel[insideKey] = this.lfb.controls({
              label: this.translateService.getTranslations(`book.${insideKey}`),
              component: SelectField,
              options: this.getMappedValue(insideKey, secondLevelValues)
            })
            // console.log(groupObj)
          })

          finalObj[key] = this.lfb.group(formGroupSecondLevel)

          // let groupObj:LiveFormGroup<{
          //         height: string,
          //         width: string,
          //         thickness: string
          //       }> = {
          }
        })
        
      console.log("finalObj: ", finalObj)
      return finalObj
    }
  }

  // async ngOnInit(): Promise<void> {
  //   this.isbnService.getExternalBookList().subscribe(booksArray => {
  //     if (!booksArray) {
  //       return
  //     }
  //     const initValues = 

  //     // this.mergeBookLiveForm = ()
  //     // console.log(this.mergeBookLiveForm)
  //     // return this.mergeBookLiveForm
  //   });
  // }

}
