import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const DynamicLengthValidator = (): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const userFilter = group.get('userFilter')?.value;
    const minLength = Number(group.get('minLength')?.value);

    console.log("User filter: ", userFilter);
    console.log('Minimum length: ', minLength);

    if (userFilter && userFilter.length >= minLength) {
      return null;
    }

    return { groupMinLength: `Min length is: ${minLength}` };
  };
};
