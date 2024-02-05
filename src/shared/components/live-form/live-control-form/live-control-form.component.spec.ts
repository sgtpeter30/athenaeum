import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveControlFormComponent } from './live-control-form.component';

describe('LiveControlFormComponent', () => {
  let component: LiveControlFormComponent;
  let fixture: ComponentFixture<LiveControlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveControlFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveControlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
