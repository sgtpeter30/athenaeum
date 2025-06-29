import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBaseModel } from '@lib/shared';

@Component({
    selector: 'app-live-control-form',
    imports: [],
    templateUrl: './live-control-form.component.html',
    styleUrl: './live-control-form.component.scss'
})
export class LiveControlFormComponent implements AfterViewInit{

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef}) dynamicComponentContainer!: ViewContainerRef;
  @Input() field: any;
  formName!: FormGroup;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.generateDynamicField()
  }

  private generateDynamicField(){
    this.dynamicComponentContainer.clear();
    const componentInstance = this.field.component // DynamicSelectComponent
    const dynamicComponent = this.dynamicComponentContainer.createComponent(componentInstance)   
    dynamicComponent.setInput('field', this.field);    
    this.cd.detectChanges();
  }
}
