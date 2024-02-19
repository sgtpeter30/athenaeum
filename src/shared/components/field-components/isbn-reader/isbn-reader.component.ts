import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
  templateUrl: './isbn-reader.component.html',
  styleUrl: './isbn-reader.component.scss',
})
export class IsbnReaderComponent {
  @Input() field!: any;
  formName!: FormGroup;

  @ViewChild('isbn_video') video!: {nativeElement: HTMLVideoElement};
  private codeReader!: BrowserMultiFormatReader;

  constructor(
    private formgroupDirective: FormGroupDirective,
    private booksService : BooksService,
  ) {
    this.formName = formgroupDirective.control;
  }
  getISBN(){
    let deviceId: string
    this.codeReader = new BrowserMultiFormatReader();
    console.log(this.video);
    
    this.codeReader.listVideoInputDevices().then((videoInputDevices) => {
      console.log('Available video input devices: ', videoInputDevices);
      deviceId = videoInputDevices[0].deviceId
      this.runCamera(deviceId)
    });
  }
  runCamera(deviceId: string){
    this.codeReader.decodeFromVideoDevice(deviceId, this.video.nativeElement, (result: Result)=>{
      if(result?.getText()){
        const isbn = result?.getText()
        this.formName.get('isbn')?.setValue(isbn)
        this.codeReader.reset();
        this.booksService.searchByISBN(isbn)
      }
    })
  }
    
  commonErrorMessage = new CommonErrorMessage() 
  getErrorMessage(){
    return this.formName.controls[this.field.name].errors ? this.commonErrorMessage.getErrorMessage(this.formName.controls[this.field.name].errors) : '';
  }
}
