import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.length < 5) {
      return { invalidEmail: true };
    }
    return null;
  };
};
