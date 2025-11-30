import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeDataComponent } from './merge-data.component';

describe('MergeDataComponent', () => {
  let component: MergeDataComponent;
  let fixture: ComponentFixture<MergeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MergeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
