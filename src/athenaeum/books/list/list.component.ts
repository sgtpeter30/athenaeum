import { trigger, state, style, transition, animate } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Book } from '@lib/shared';
import { BooksService } from 'src/shared/services/items/books.service';
import { ListBookFormComponent } from "./list-book-form/list-book-form.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    imports: [
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ListBookFormComponent,
    ]
})
export class ListComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<Book>
  // todo redesign
  columnsToDisplayBase = ['title', 'author'];
  columnsToDisplay = [
    {
      label: 'Tytuł',
      value: 'title',
    }, 
    {
      label: 'Autor',
      value: 'author'
    },
  ];
  extend = ['edit']
  columnsToDisplayWithExpand = [...this.columnsToDisplayBase, 'edit'];

  expandedElement: any | null;

  

  constructor(
    private booksService : BooksService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
  ){
    booksService.getBooksList().subscribe(bookList =>{
      this.dataSource = new MatTableDataSource(bookList);
    })
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  expandElement(element: any, $event: Event){
    this.expandedElement = this.expandedElement === element ? null : element;
    $event.stopPropagation()
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  editRow(element: Book & {isInEdit: boolean}){
    this.expandedElement = element
    element.isInEdit = true;
  }

  goHome(){
    this.router.navigate(["/home"]);
  }
}