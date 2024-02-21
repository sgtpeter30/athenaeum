import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { BooksService } from 'src/shared/services/items/books.service';
import { CommonErrorMessage } from 'src/shared/validators';

@Component({
  selector: 'app-isbn-reader',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './isbn-reader-field.component.html',
  styleUrl: './isbn-reader-field.component.scss',
})
export class IsbnReaderFieldComponent {
  @Input() field!: any;
  formName!: FormGroup;

  @ViewChild('dialog') dialog!: {nativeElement: HTMLDialogElement};
  @ViewChild('isbn_video') video!: {nativeElement: HTMLVideoElement};
  private codeReader!: BrowserMultiFormatReader;

  constructor(
    private formgroupDirective: FormGroupDirective,
    private booksService : BooksService,
    private snackBar : MatSnackBar,
  ) {
    this.formName = formgroupDirective.control;
  }
  getISBN(){
    this.codeReader = new BrowserMultiFormatReader();
    this.codeReader.decodeFromVideoDevice(null, this.video.nativeElement, (result: Result)=> {
      this.dialog.nativeElement.showModal();
      console.log(result);
      if(result?.getText()){
        const isbn = result?.getText()
        this.formName.get('isbn')?.setValue(isbn)
        this.codeReader.reset();
        this.booksService.searchByISBN(isbn)
        this.dialog.nativeElement.close();
      }
    })
    .catch(err=>{
      console.log(err);
      this.snackBar.open('Brak kamery!', undefined, {
        duration: 2000,
        panelClass: 'error-snack',
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    })
    
  }

  findByISBN(){
    const isbn =  this.formName.get('isbn')?.value
    this.booksService.searchByISBN(isbn)
  }
    
  commonErrorMessage = new CommonErrorMessage() 
  getErrorMessage(){
    return this.formName.controls[this.field.name].errors ? this.commonErrorMessage.getErrorMessage(this.formName.controls[this.field.name].errors) : '';
  }
}
