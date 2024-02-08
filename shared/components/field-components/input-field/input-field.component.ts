import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonErrorMessage } from '@lib/shared';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input() field!: any;
  formName!: FormGroup;

  constructor(
    private formgroupDirective: FormGroupDirective,
  ) {
    this.formName = formgroupDirective.control;
  }
  commonErrorMessage = new CommonErrorMessage() 

  getErrorMessage(){
    return this.formName.controls[this.field.name].errors ? this.commonErrorMessage.getErrorMessage(this.formName.controls[this.field.name].errors) : '';
  }
}
