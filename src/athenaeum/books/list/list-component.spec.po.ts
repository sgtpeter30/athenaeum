import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListComponent } from "./list.component";

export class ListComponentPO{
	component!: ListComponent;
	fixture!: ComponentFixture<ListComponent>;
	
	init = ()=>{
		return this.component.
	}

	// beforeEach(async () => {
	// 	await TestBed.configureTestingModule({
	// 		imports: [ListComponent]
	// 	})
	// 		.compileComponents();
	
	// 	this.fixture = TestBed.createComponent(ListComponent);
	// 	component = fixture.componentInstance;
	// 	fixture.detectChanges();
	// });

}