import { AbstractControl, ValidationErrors, Validator, ValidatorFn, Validators } from "@angular/forms";

export function PasswordValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl<any, any>): ValidationErrors | null => {
    const passwordMissmatch = control.value !== control.parent?.get(controlName)?.value;
    return passwordMissmatch ? {'passwordMissmatch': true} : null;
  }
}