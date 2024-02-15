import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  @ViewChild('video') video!: ElementRef;
  private codeReader!: BrowserMultiFormatReader;

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
}
