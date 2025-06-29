import { Component, Input, ViewChild, inject } from '@angular/core';
import { LiveFormBuilder, LiveFormComponent } from 'src/shared/components/live-form';
import { Book, LiveFormModel } from 'src/shared/models';
import { SelectFieldComponent } from '../../../select-field/select-field.component';
import { TranslationService } from 'src/shared/services';

@Component({
    selector: 'app-merge-data-form',
    imports: [
        LiveFormComponent
    ],
    templateUrl: './merge-data-form.component.html',
    styleUrl: './merge-data-form.component.scss'
})
export class MergeDataFormComponent {
  @Input({ required: true })
  externalBooksArray: Book[] | null = [];

  lfb: LiveFormBuilder = new LiveFormBuilder()
  mergeBookLiveForm!: LiveFormModel
  @ViewChild('mergeBookForm') mergeBookForm!: LiveFormComponent

  translateService = inject(TranslationService)

  getMappedValue(name: keyof Book) {
    if(this.externalBooksArray){
      const uniqueValues = new Set(this.externalBooksArray.map(e => e[name]))
      const options = Array.from(uniqueValues).map(item => {
        if(typeof item !== "undefined"){
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

  generateGroupsFromData(){
    if(this.externalBooksArray){
      const finalObj: any = {};
      const uniqueKeys = new Set(this.externalBooksArray.reduce((acc, book) => {
        Object.keys(book).forEach(key => acc.add(key));
        return acc;
      }, new Set()));
  
      console.log(uniqueKeys)
      
      Array.from(uniqueKeys).map((key:any) => {
        finalObj[key] = this.lfb.controls({
          label: this.translateService.getTranslations(`book.${key}`),
          component: SelectFieldComponent,
          data: this.getMappedValue(key)
        })
      })
  
      return finalObj
    }
  }

  ngOnInit(): void {
    this.mergeBookLiveForm = ({
      name: 'mergeBookForm',
      group: this.lfb.group<Partial<Book>>(this.generateGroupsFromData())
    })
  }

}
