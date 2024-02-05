import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Book, InputFieldComponent, LiveFormBuilder, LiveFormModel } from '@lib/shared';
import { LiveFormComponent } from "@lib/shared";

@Component({
    selector: 'app-list-book-form',
    standalone: true,
    templateUrl: './list-book-form.component.html',
    styleUrl: './list-book-form.component.scss',
    imports: [
        CommonModule,
        LiveFormComponent,
    ]
})
export class ListBookFormComponent implements OnInit {
  @Input()
  book!: Book & {isInEdit: boolean}

  @Input()
  isInEdit: boolean = false;

  lfb = new LiveFormBuilder()
  bookLiveForm!: LiveFormModel
  @ViewChild('bookForm') bookForm!: LiveFormComponent

  ngOnInit(): void{    
    this.bookLiveForm = ({
      name: 'bookForm',
      group: this.lfb.group<Partial<Book>>({
        cover: this.lfb.controls({
          component: InputFieldComponent,
        }),
        author: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Autor',
          value: this.book.author,
          validators: Validators.required,
        }),
        title: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Tytuł',
          validators: Validators.required,
        }),
        series: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Seria',
        }),
        volume: this.lfb.controls({
          component: InputFieldComponent,
          inputType: 'number',
          label: 'Tom',
        }),
        comment: this.lfb.controls({
          component: InputFieldComponent,
          label: 'Komentarz'
        })

      }),
      initValues: this.book,
    })
  }
}
