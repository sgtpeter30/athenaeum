import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MergeDataInfoComponent } from './merge-data-info/merge-data-info.component';
import { MergeDataFormComponent } from './merge-data-form/merge-data-form.component';
import { Book, BooksService } from '@lib/shared';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from 'src/shared/pipes';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExternalBook } from 'src/shared/models/external-book.model';
import { ISBNService } from '../isbn-service/isbn.service';

@Component({
    selector: 'app-merge-data',
    templateUrl: './merge-data.component.html',
    styleUrl: './merge-data.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatRadioModule,
        MergeDataInfoComponent,
        MergeDataFormComponent,
        MatProgressSpinnerModule,
        TranslatePipe
    ]
})
export class MergeDataComponent {
  @ViewChild('mergeForm') mergeForm!: any;
  @ViewChild('mergeInfo') mergeInfo!: any;

  bookService = inject(BooksService);
  isbnService = inject(ISBNService);
  dialogRef = inject(MatDialogRef<MergeDataComponent>);

  editEnabled: boolean = false;

  saveNewData() {
    const newBookData = this.isbnService.getBookDataFromExternalBook();
    this.bookService.updateCurrentBook(newBookData);
    this.dialogRef.close();
  }
}
