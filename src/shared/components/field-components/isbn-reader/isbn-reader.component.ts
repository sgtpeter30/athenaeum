import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserMultiFormatReader } from '@zxing/library';
import { CommonErrorMessage } from 'src/shared/validators';

@Component({
  selector: 'app-isbn-reader',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './isbn-reader.component.html',
  styleUrl: './isbn-reader.component.scss'
})
export class IsbnReaderComponent {
  @Input() field!: any;
  formName!: FormGroup;

  @ViewChild('video') video!: ElementRef;
  private codeReader!: BrowserMultiFormatReader;

  constructor(
    private formgroupDirective: FormGroupDirective,
  ) {
    this.formName = formgroupDirective.control;
  }

  ngAfterViewInit() {
    this.codeReader = new BrowserMultiFormatReader();
    this.codeReader.listVideoInputDevices().then((videoInputDevices) => {
      console.log('Available video input devices: ', videoInputDevices);
    });

  //   this.codeReader.decodeFromVideoDevice(, 'video')
  //     .then((result: Result) => {
  //       console.log('Result: ', result.text);
  //       this.codeReader.reset();
  //     })
  //     .catch((err) => {
  //       console.error('Error: ', err);
  //     });
  }
  
  commonErrorMessage = new CommonErrorMessage() 
  getErrorMessage(){
    return this.formName.controls[this.field.name].errors ? this.commonErrorMessage.getErrorMessage(this.formName.controls[this.field.name].errors) : '';
  }
}
