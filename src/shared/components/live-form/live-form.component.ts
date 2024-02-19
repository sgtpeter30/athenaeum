import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Signal, SimpleChanges } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveFieldComponent, LiveFormModel, LiveFormGroupModel } from '@lib/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forEach } from 'lodash';
import { LiveControlFormComponent } from './live-control-form/live-control-form.component';

@Component({
  selector: 'app-live-form',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    LiveControlFormComponent,
  ],
  templateUrl: './live-form.component.html',
  styleUrl: './live-form.component.scss'
})
export class LiveFormComponent implements OnInit, OnChanges{
  @Input()
  formModel!: LiveFormModel

  @Input()
  // readonly: Signal<boolean> = false
  disabled: boolean = false

  @Input()
  showLoader?: boolean = false;

  fields: LiveFieldComponent[] = [];

  form!: FormGroup;
  formName!: string;

  constructor(
    private snackBar : MatSnackBar,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    const baseGroup = this.formModel.group
    this.formName = this.formModel.name,
    this.form = this.createGroup(baseGroup);
    this.setValues(this.formModel.initValues)
    if(this.disabled){
      this.setDisabled()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.disabled ? this.setDisabled() : this.setEnabled()
  }

  public isValid(): void | {} {
    return this.form.valid
  }

  public getValueIfValid(): void | {} {
    if(this.form.valid){
      return this.form.value
    }else{
      this.form.markAllAsTouched()
      return
    }
  }
  
  public getValue() : {}{
    return this.form.value
  }

  public setDisabled(): void {
    this.form?.disable({
      emitEvent: false,
    })
  }

  public setEnabled(): void {
    this.form?.enable({
      emitEvent: false,
    })
  }
  public toggleDisable(): void {
    this.form?.disabled ? this.setEnabled() : this.setDisabled()
  }
  
  private createGroup(data: LiveFormGroupModel): FormGroup {
    const newGroup: {[key: string]: AbstractControl, } = {};
    forEach(data, (item, key)=>{
      this.fields.push({
        name: key, 
        label: item.label, 
        component: item.component,
        type: item.inputType ?? 'text',
        data: item.data,
      })
      if(item.disabled){
        item.formItem.disable()
      }
      return newGroup[key] = item.formItem;
    })
    return this.fb.group(newGroup)
  }

  public setValues<T extends object>(data: T){
    this.form.patchValue(data)
  }
}
