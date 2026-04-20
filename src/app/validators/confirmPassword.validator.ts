import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormArray } from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent;
    if (!formGroup) {
      return null;
    }

    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.value === '') {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      return { confirmPasswordMismatch: true };
    }

    return null;
  };
}

export function phonesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    if (formArray.length === 0) {
      return { phonesRequired: true };
    }
    return null;
  };
}
