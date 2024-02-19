import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonErrorMessage } from 'src/shared/validators';

@Component({
  selector: 'app-image-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './image-field.component.html',
  styleUrl: './image-field.component.scss'
})
export class ImageFieldComponent {
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
