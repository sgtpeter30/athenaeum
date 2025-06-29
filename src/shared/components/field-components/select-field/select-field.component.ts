import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonErrorMessage } from 'src/shared/validators';

@Component({
    selector: 'app-select-field',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
    templateUrl: './select-field.component.html',
    styleUrl: './select-field.component.scss'
})
export class SelectFieldComponent {
  @Input() field!: any;
  formName!: FormGroup;

  constructor(
    private formgroupDirective: FormGroupDirective,
  ) {
    this.formName = formgroupDirective.control;
  }
  
  commonErrorMessage = new CommonErrorMessage()
  getErrorMessage() {
    return this.formName.controls[this.field.name].errors ? this.commonErrorMessage.getErrorMessage(this.formName.controls[this.field.name].errors) : '';
  }
}
