import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    // We need to set errors only when confirm is set.
    if (control.get('passwordConfirm').value === '') {
      return null;
    }

    const passwordsMatch = control.get('password').value === control.get('passwordConfirm').value;

    return passwordsMatch ? null : { passwordsDoesntMatch: { value: control.value } };
  };
}
