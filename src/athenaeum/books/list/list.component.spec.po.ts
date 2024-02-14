import { ComponentFixture, TestBed  } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { ListComponent } from "./list.component";
import { BooksService } from "src/shared/services/items/books.service";
import { Book } from "@lib/shared";
import { ListComponentMock } from "./list.component.spec.mock";

export class ListComponentPO{
	elements = {
		bookList: document.querySelector('[data-test-id="book-list"] '),
		book: (index: number) => screen.findByTestId(`book-${index}`),
	}

	actions = {
		init: async ()=>{
		}
	}
	

	constructor(
		container: HTMLElement,
		fixture: ComponentFixture<ListComponent>
	){}

	static async render(){
		const {container, fixture} = await render(ListComponent, {
			imports: [
				HttpClientTestingModule
			],
			providers: [
				// BooksService,
				{
					provide: sessionStorage,
					useValue: {
						bookList: JSON.stringify(ListComponentMock.bookList),
					},
				},
				// {
				// 	provide: BooksService,
				// 	// useValue: ListComponentMock.bookService
				// 	useValue: {
				// 		// getBooksList: ()=>{},
				// 		// getBooksList: 
				// 		bookList: ()=> ListComponentMock.bookList
				// 	}
				// },
				HttpClientTestingModule
			],

		})

		return new ListComponentPO(container as HTMLElement, fixture)
	}
}
// beforeEach(async () => {
// 	await TestBed.configureTestingModule({
// 		imports: [ListComponent]
// 	})
// 		.compileComponents();

// 	fixture = TestBed.createComponent(ListComponent);
// 	component = fixture.componentInstance;
// 	fixture.detectChanges();
// });

