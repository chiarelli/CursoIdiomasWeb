import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minSelectedItems(min = 1): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return Array.isArray(value) && value.length >= min
      ? null
      : { minSelected: { required: min, actual: (value?.length || 0) } };
  };
}
