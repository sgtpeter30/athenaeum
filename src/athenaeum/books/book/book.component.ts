import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService, Book, IsbnReaderFieldComponent, BooksService, TranslationService } from '@lib/shared';
import { LiveFormComponent, LiveFormBuilder, LiveFormModel, TextField, ImageFieldComponent, CheckboxFieldComponent, NumberField, DateField, SelectField } from '@props-and-tinkering/pt-core';
import { disabled, form, hidden } from '@angular/forms/signals';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    LiveFormComponent
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  showBookLoader: boolean = false

  booksService = inject(BooksService);
  translate = inject(TranslationService);

  lfb = new LiveFormBuilder();
  bookHTML: LiveFormModel<Book> = {
    name: 'bookForm',
    controls: {
      _id: this.lfb.controls({
        label: "id",
        component: TextField,
        hidden: true,
        // disabled: true,
      }),
      isbn: this.lfb.controls({
        component: IsbnReaderFieldComponent,
        label: 'ISBN',
        class: 'isbn-field'
      }),
      title: this.lfb.controls({
        component: TextField,
        label: 'Tytuł'
      }),
      cover: this.lfb.controls({
        component: ImageFieldComponent,
      }),
      author: this.lfb.controls({
        component: TextField,
        label: 'Autor'
      }),
      decription: this.lfb.controls({
        component: TextField,
        label: 'Opis'
      }),
      edition: this.lfb.controls({
        component: TextField,
        label: 'Edycja'
      }),
      orgLang: this.lfb.controls({
        component: TextField,
        label: 'Język orginału'
      }),
      orgTitle: this.lfb.controls({
        component: TextField,
        label: 'Tytuł orginału',
      }),
      size: this.lfb.controls({
        component: TextField,
        label: 'Wymiary'
      }),
      comment: this.lfb.controls({
        component: TextField,
        label: 'Twoje komentarze'
      }),
      series: this.lfb.controls({
        component: NumberField,
        label: 'Seria',
      }),
      volume: this.lfb.controls({
        component: NumberField,
        label: 'Tom',
      }),
      publisher: this.lfb.controls({
        component: TextField,
        label: 'Wydawca',
      }),
      translation: this.lfb.controls({
        component: TextField,
        label: 'Autor tłumaczenia',
      }),
      ilustrations: this.lfb.controls({
        component: TextField,
        label: 'Autor ilustracji',
      }),
      type: this.lfb.controls({
        component: TextField,
        label: 'Typ (ksiażka/komiks)',
      }),
      pages: this.lfb.controls({
        component: NumberField,
        label: 'Ilość stron',
      }),
      favourite: this.lfb.controls({
        component: CheckboxFieldComponent,
        label: 'Ulubione',
      }),
      read: this.lfb.controls({
        component: CheckboxFieldComponent,
        label: 'Przeczytane',
      }),
      wishlist: this.lfb.controls({
        component: CheckboxFieldComponent,
        label: 'Na liście życzeń',
      }),
      priceOrg: this.lfb.controls({
        component: NumberField,
        label: 'Cena orginalna',
        data: {
          suffix: 'zł',
        }
      }),
      price: this.lfb.controls({
        component: NumberField,
        label: 'Cena',
        data: {
          suffix: 'zł',
        }
      }),
      rating: this.lfb.controls({
        component: NumberField,
        label: 'Ocena',
      }),
      myTag: this.lfb.controls({
        component: TextField,
        label: 'Moje tagi',
      }),
      mode: this.lfb.controls({
        hidden: true,
        component: SelectField,
        options: [
          {label: 'New', value: "new"}
        ]
      }),
      publishedDate: this.lfb.controls({
        component: DateField
      }),
      dimensions: this.lfb.group<Book["dimensions"]>({
        height: this.lfb.controls({
          component: TextField,
          label: this.translate.getTranslations('book.height')
        }),
        width: this.lfb.controls({
          component: TextField,
          label: this.translate.getTranslations('book.width')
        }),
        thickness: this.lfb.controls({
          component: TextField,
          label: this.translate.getTranslations('book.thickness')
        })
      }),
    }
  }

  bookSignal = signal<Book>(this.booksService.getCurrentBook())

  bookForm = form(this.bookSignal, (rootPath)=>{
    hidden(rootPath._id, ()=>true)
    disabled(rootPath._id, ()=>true)
  })

  constructor(
    private userService: UserService,
    // private booksService: BooksService,
  ) { }

  // ngOnInit(): void {
  //   this.bookLiveForm = ()

  //   this.booksService.getCurrentBook().subscribe(book => {
  //     this.bookForm?.setValues(book)
  //   })
  // }


}
