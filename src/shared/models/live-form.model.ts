import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import { keys } from "lodash";
import { LiveFormBuilder } from "../components";

export enum LiveFormTypes {
  LiveFormControl = 'LiveFormControl',
  LiveFormGroup = 'LiveFormGroup',
  LiveFormArray = 'LiveFormArray',
}

export interface LiveFormModel{
  name: string;
  group: LiveFormGroupModel;
  validators?: any;
  initValues?: any;
}

export interface LiveFormGroupModel{
  [name: string]: any
}
export type LiveFormGroup<T> = {
  [name in keyof T]: LiveFormControlConverted;
};
// todo add array handling
// export interface LiveFormArray<T = any>{
//   arrayName: string;
//   arrayValue: LiveFormGroup<T>[]
// }

export interface FormBaseModel{
  component: any;
  data?: any;
  label?: string;
  class?: string;
  disabled?: boolean;
  hidden?: boolean;
  inputType?: string;
}

export interface LiveFormControl extends FormBaseModel{
  value?: any;
  validators?: ValidatorFn | ValidatorFn[];
}
export interface LiveFormControlConverted extends FormBaseModel{
  type: LiveFormTypes;
  formItem: AbstractControl;
  component: any,
}

export interface LiveFieldComponent extends FormBaseModel{
  name: string,
  type: string,
}