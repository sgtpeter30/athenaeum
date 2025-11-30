import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeDataInfoComponent } from './merge-data-info.component';

describe('MergeDataInfoComponent', () => {
  let component: MergeDataInfoComponent;
  let fixture: ComponentFixture<MergeDataInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeDataInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MergeDataInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
