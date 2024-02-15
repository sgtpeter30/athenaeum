import { ComponentFixture, TestBed  } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { ListComponent } from "./list.component";
import { BooksService } from "src/shared/services/items/books.service";
import { Book } from "@lib/shared";
import { ListComponentMock } from "./list.component.spec.mock";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ListBookFormComponent } from "./list-book-form/list-book-form.component";
import { Observable, of, delay } from "rxjs";

export class ListComponentPO {
	fixture: any;
	detectChanges: any;

	elements = {
		bookList: ()=> screen.getByTestId('book-list'),
		book: (index: number) => screen.queryByTestId(`book-${index}`),
	}

	actions = {
		getData: async ()=>{
			
		}
	}

	constructor(
		container: HTMLElement,
		fixture: ComponentFixture<ListComponent>,
		detectChanges: any
	){
		this.fixture = fixture
		this.detectChanges = detectChanges
	}

	static async render(){
		const {container, fixture, detectChanges} = await render(ListComponent, {
			imports: [
				HttpClientTestingModule,
			],
			providers: [
				{
					provide: BooksService,
					useValue: {
						getBooksList: () => ListComponentMock.getBooksList(),
						// getBooksList: (): Observable<Partial<Book>[]>=>{
						// 	return of(bookListTest).pipe(delay(1))
						// 	// return of(bookList)
						// }
					}
				},
				HttpClientTestingModule
			],
			detectChangesOnRender: true
		})

		
		return new ListComponentPO(container as HTMLElement, fixture, detectChanges)
	}
}