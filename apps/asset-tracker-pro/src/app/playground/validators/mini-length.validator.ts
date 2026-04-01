import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const minLengthValidator =  (minLength: number): ValidatorFn =>{
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value && value.length >= minLength) return null;

    return  {minLength: `Min length must be at least ${minLength}`};
  }
}
