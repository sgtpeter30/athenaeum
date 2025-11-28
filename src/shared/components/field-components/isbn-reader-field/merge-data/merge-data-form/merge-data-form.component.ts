import { Component, Input, Type, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { LiveFormBuilder, LiveFormComponent } from 'src/shared/components/live-form';
import { Book, ExternalBook, LiveFormGroup, LiveFormModel } from 'src/shared/models';
import { SelectFieldComponent } from '../../../select-field/select-field.component';
import { TranslationService } from 'src/shared/services';
import { CheckboxFieldComponent } from '../../../checkbox-field/checkbox-field.component';
import { ISBNService } from '../../isbn-service/isbn.service';

@Component({
  selector: 'app-merge-data-form',
  imports: [
    LiveFormComponent
  ],
  templateUrl: './merge-data-form.component.html',
  styleUrl: './merge-data-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MergeDataFormComponent {

  private isbnService = inject(ISBNService)
  externalBooksArray = this.isbnService.getExternalBookList();

  lfb: LiveFormBuilder = new LiveFormBuilder()
  mergeBookLiveForm!: LiveFormModel
  @ViewChild('mergeBookForm') mergeBookForm!: LiveFormComponent

  translateService = inject(TranslationService)

  getMappedValue(name: any, booksArray: any[]) {
    if (booksArray) {
      const uniqueValues = new Set(booksArray.map(e => e[name]))
      const options = Array.from(uniqueValues).map(item => {
        if (typeof item !== "undefined") {
          return {
            name: item,
            value: item
          }
        }
        return
      })
      return options.filter(element => element)
    }
    return
  }

  generateGroupsFromData(booksArray: Book[]) {
    if (booksArray) {
      const finalObj: any = {};
      const uniqueKeys = new Set(booksArray.reduce((acc, book) => {
        Object.keys(book).forEach(key => acc.add(key));
        return acc;
      }, new Set()));


      let uniqueKeysArray = [...uniqueKeys] as (keyof ExternalBook)[]
      // najpierw jako klucze ExternalBook, potem zawężamy do keyof Book

      // usuń pola specyficzne dla ExternalBook
      const isBookKey = (k: keyof ExternalBook): k is keyof Book =>
        k !== 'selected' && k !== 'source';
      const bookKeysArray = uniqueKeysArray.filter(isBookKey) as (keyof Book)[];

      bookKeysArray.forEach((key: keyof Book) => {

        finalObj[`${key}_include`] = this.lfb.controls({
          component: CheckboxFieldComponent,
        })

        const sample = booksArray.find(item => typeof item[key] !== 'undefined' && item[key] !== null);
        const sampleValue = sample?.[key];
        finalObj[key] = this.lfb.controls({
            label: this.translateService.getTranslations(`book.${key}`),
            component: SelectFieldComponent,
            data: this.getMappedValue(key, booksArray)
          })
          // todo do it after adding second level group in form-builder
        // if (typeof sampleValue !== "object") {
        //   // item
        //   finalObj[key] = this.lfb.controls({
        //     label: this.translateService.getTranslations(`book.${key}`),
        //     component: SelectFieldComponent,
        //     data: this.getMappedValue(key, booksArray)
        //   })
        // } else {
        //   //! second level Object
        //   console.log(key, typeof sampleValue, sampleValue);
        //   console.log("-----------------------------------------------------------------------------")
        //   console.log(sampleValue)
        //   const insideKeys = Object.keys(sampleValue as Object)
        //   // .forEach(key => acc.add(key));
        //   const secondLevelValues = booksArray.map(e => e[key])
        //   console.log("secondLevelValues")
        //   console.log(secondLevelValues)
        //   const formGroupSecondLevel: any[] = []
        //   insideKeys.forEach(insideKey => {
        //     console.log(insideKey)
        //     console.log(this.translateService.getTranslations(`book.${insideKey}`),)

        //     let groupObj:LiveFormGroup<any> = {
        //       [insideKey]: this.lfb.controls({
        //         label: this.translateService.getTranslations(`book.${insideKey}`),
        //         component: SelectFieldComponent,
        //         data: this.getMappedValue(insideKey, secondLevelValues)
        //       })
        //     }
        //     console.log(groupObj)
        //     formGroupSecondLevel.push(groupObj)
        //   })

          
        //   finalObj[key] = this.lfb.group({
            
        //   })
        //   console.log(finalObj)
        // }
      })

      return finalObj
    }
  }

  async ngOnInit(): Promise<void> {
    this.isbnService.getExternalBookList().subscribe(booksArray => {
      if (!booksArray) {
        return
      }
      const initValues = booksArray.find(item => item.selected) || {}

      this.mergeBookLiveForm = ({
        name: 'mergeBookForm',
        group: this.lfb.group<Partial<ExternalBook>>(this.generateGroupsFromData(booksArray)),
        initValues: initValues
      })
      // console.log(this.mergeBookLiveForm)
      return this.mergeBookLiveForm
    });
  }

}
