import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeDataFormComponent } from './merge-data-form.component';

describe('MergeDataFormComponent', () => {
  let component: MergeDataFormComponent;
  let fixture: ComponentFixture<MergeDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeDataFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MergeDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
