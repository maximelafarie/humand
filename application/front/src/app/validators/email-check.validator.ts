import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailCheckValidator(): ValidatorFn {

  const beginRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/;
  const begin = beginRegex.toString().substring(1, beginRegex.toString().length - 1);

  const endRegex = /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const end = endRegex.toString().substring(1, endRegex.toString().length - 1);

  const re = new RegExp(begin + end);

  return (control: AbstractControl): { [key: string]: any } => {
    const emailTest = re.test(control.value);
    const empty = !control.value || control.value.length === 0;

    return emailTest || empty ? null : { badEmailFormat: { value: control.value } };
  };
}
