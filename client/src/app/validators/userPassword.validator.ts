import { AbstractControl } from '@angular/forms'

export function userPasswordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^(([\._\-a-zA-Z0-9]){4,20})$/.test(control.value);
  return valid
    ? null
    : { invalidUsername: { valid: false, value: control.value } }
}
