import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveGroupFormComponent } from './live-group-form.component';

describe('LiveGroupFormComponent', () => {
  let component: LiveGroupFormComponent;
  let fixture: ComponentFixture<LiveGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveGroupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
