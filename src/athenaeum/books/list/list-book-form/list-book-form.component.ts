
import { Component, input, Input, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { Book } from '@lib/shared';
import { LiveFormComponent, LiveFormBuilder, LiveFormModel, InputFieldComponent, TextField, NumberField } from '@props-and-tinkering/pt-core';

@Component({
  selector: 'app-list-book-form',
  templateUrl: './list-book-form.component.html',
  styleUrl: './list-book-form.component.scss',
  imports: [
    LiveFormComponent
  ]
})
export class ListBookFormComponent {
  @Input()
  book!: Partial<Book>
  //  & { isInEdit: boolean }
  
  // book!: Book & { isInEdit: boolean }
  // book: Partial<Book> = input.required<Partial<Book>>();

  @Input()
  isInEdit: boolean = false;

  lfb = new LiveFormBuilder();

  bookLiveHTML: LiveFormModel<Partial<Book>> = {
    name: 'bookForm',
    controls: {
      cover: this.lfb.controls({
        component: TextField,
      }),
      author: this.lfb.controls({
        component: TextField,
        label: 'Autor',
        value: this.book.author,
        validators: Validators.required,
      }),
      title: this.lfb.controls({
        component: TextField,
        label: 'Tytuł',
        validators: Validators.required,
      }),
      series: this.lfb.controls({
        component: TextField,
        label: 'Seria',
      }),
      volume: this.lfb.controls({
        component: NumberField,
        label: 'Tom',
      }),
      comment: this.lfb.controls({
        component: TextField,
        label: 'Komentarz'
      })

    }
  }

  bookLiveSignal = signal(this.book);

  bookLiveForm = form<Partial<Book>>(this.bookLiveSignal)
}
