import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonErrorMessage } from 'src/shared/validators';

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.scss'
})
export class CheckboxFieldComponent {
  @Input() field!: any;
  formName!: FormGroup;

  constructor(
    private formgroupDirective: FormGroupDirective,
  ) {
    this.formName = formgroupDirective.control;
  }
}
