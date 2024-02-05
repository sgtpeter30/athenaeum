import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookFormComponent } from './list-book-form.component';

describe('ListBookFormComponent', () => {
  let component: ListBookFormComponent;
  let fixture: ComponentFixture<ListBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBookFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
