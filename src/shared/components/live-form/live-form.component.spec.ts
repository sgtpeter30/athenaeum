import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveFormComponent } from './live-form.component';

describe('LiveFormComponent', () => {
  let component: LiveFormComponent;
  let fixture: ComponentFixture<LiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
