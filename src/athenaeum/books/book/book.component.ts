import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Validators } from '@angular/forms';
import { LiveFormBuilder, LiveFormModel, LiveFormComponent, UserService, InputFieldComponent, Book, ImageFieldComponent, IsbnReaderFieldComponent } from '@lib/shared';
import { CheckboxFieldComponent } from 'src/shared/components/field-components/checkbox-field/checkbox-field.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    LiveFormComponent
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  showBookLoader: boolean = false

  bookValue: any

  lfb: LiveFormBuilder = new LiveFormBuilder()
  bookLiveForm!: LiveFormModel
  @ViewChild('bookForm') bookForm!: LiveFormComponent

  constructor(
    private userService : UserService,
  ){}

  ngOnInit(): void {
    this.bookLiveForm = ({
      name: 'bookForm',
      group: this.lfb.group<Partial<Book>>({
        _id: this.lfb.controls({
          component: InputFieldComponent,
          hidden: true,
          disabled: true,
        }),
        isbn: this.lfb.controls({
          component: IsbnReaderFieldComponent,
          data: {},
          label: 'ISBN',
          class: 'isbn-field'
        }),
        title: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Tytuł'
        }),
        cover: this.lfb.controls({
          component: ImageFieldComponent,
        }),
        author: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Autor'
        }),
        decription: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Opis'
        }),
        edition: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Edycja'
        }),
        orgLang: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Język orginału'
        }),
        orgTitle: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Tytuł orginału',
        }),
        size: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Wymiary'
        }),
        comment: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Twoje komentarze'
        }),
        series: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Seria',
          inputType: 'number',
        }),
        volume: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Tom',
          inputType: 'number',
        }),
        publisher: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Wydawca',
        }),
        translation: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Autor tłumaczenia',
        }),
        ilustrations: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Autor ilustracji',
        }),
        type: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Typ (ksiażka/komiks)',
        }),
        pages: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Ilość stron',
          inputType: 'number',
        }),
        favourite: this.lfb.controls({
          component: CheckboxFieldComponent,
          label: 'Ulubione',
          inputType: 'checkbox',
        }),
        
        read: this.lfb.controls({
          component: CheckboxFieldComponent,
          label: 'Przeczytane',
          inputType: 'checkbox',
        }),
        wishlist: this.lfb.controls({
          component: CheckboxFieldComponent,
          label: 'Na liście życzeń',
          inputType: 'checkbox',
        }),
        priceOrg: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Cena orginalna',
          inputType: 'number',
          data: {
            suffix: 'zł',
          }
        }),
        price: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Cena',
          inputType: 'number',
          data: {
            suffix: 'zł',
          }
        }),
        rating: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Ocena',
          inputType: 'number',
        }),
        myTag: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Moje tagi',
        })
      })
    })
  }
}
