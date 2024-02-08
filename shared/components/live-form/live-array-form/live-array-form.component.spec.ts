import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveArrayFormComponent } from './live-array-form.component';

describe('LiveArrayFormComponent', () => {
  let component: LiveArrayFormComponent;
  let fixture: ComponentFixture<LiveArrayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveArrayFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveArrayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
