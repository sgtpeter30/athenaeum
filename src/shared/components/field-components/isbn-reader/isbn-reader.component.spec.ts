import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbnReaderComponent } from './isbn-reader.component';

describe('IsbnReaderComponent', () => {
  let component: IsbnReaderComponent;
  let fixture: ComponentFixture<IsbnReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsbnReaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IsbnReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
