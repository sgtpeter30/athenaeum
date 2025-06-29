import { Component } from '@angular/core';

@Component({
    selector: 'app-drag-and-drop-file',
    imports: [],
    templateUrl: './drag-and-drop-file.component.html',
    styleUrl: './drag-and-drop-file.component.scss'
})
export class DragAndDropFileComponent {
  fileBrowserHandler(event: any){
    const file = event.target.files[0];

    console.log(file)
  }
}
