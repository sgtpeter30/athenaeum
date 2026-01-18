import { Component, inject, Input, InputSignal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { CommonErrorMessage } from 'src/shared/validators';
import { MergeDataComponent } from './merge-data/merge-data.component';
import { Book } from '@lib/shared';
import { MatDialog } from '@angular/material/dialog';
import { ISBNService } from './isbn-service/isbn.service';
import { Field } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-isbn-reader',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Field
  ],
  standalone: true,
  templateUrl: './isbn-reader-field.component.html',
  styleUrl: './isbn-reader-field.component.scss'
})
export class IsbnReaderFieldComponent {
  @Input() control!: any;
  @Input() field!: InputSignal<any>;

  @ViewChild('dialog') dialog!: { nativeElement: HTMLDialogElement };
  @ViewChild('isbn_video') video!: { nativeElement: HTMLVideoElement };
  private codeReader!: BrowserMultiFormatReader;
  private isbnService = inject(ISBNService);
  private snackBar = inject(MatSnackBar);
  private matDialog = inject(MatDialog);


  getISBN() {
    this.codeReader = new BrowserMultiFormatReader();
    this.codeReader.decodeFromVideoDevice(null, this.video.nativeElement, (result: Result) => {
      this.dialog.nativeElement.showModal();
      // console.log(result);
      if (result?.getText()) {
        const isbn = result?.getText()
        this.field().setValue(isbn)
        this.codeReader.reset();
        this.isbnService.searchByISBN(isbn)
        this.dialog.nativeElement.close();
      }
    })
      .catch(err => {
        console.log(err);
        this.snackBar.open('Brak kamery!', undefined, {
          duration: 2000,
          panelClass: 'error-snack',
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      })

  }

  async findByISBN() {
    const isbn = this.field().value()

    if (!isbn) {
      return this.snackBar.open("Uzupełnij ISBN", undefined, {
        duration: 2000,
        panelClass: 'error-snack',
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
    this.openDialog()
    await this.isbnService.searchByISBN(isbn);
    return
  }

  openDialog() {
    this.matDialog.open(MergeDataComponent)
  }

  commonErrorMessage = new CommonErrorMessage()
  getErrorMessage() {
    // return this.formName.controls[this.field.name].errors ? this.commonErrorMessage.getErrorMessage(this.formName.controls[this.field.name].errors) : '';
  }
}
