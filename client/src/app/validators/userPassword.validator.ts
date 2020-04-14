import { AbstractControl } from '@angular/forms'

export function userPasswordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /((?=.*[a-z])(?=.*[A-Z])(?=.*[$@!%*_#?]).{6,20})/.test(control.value);
  return valid
    ? null
    : { invalidUsername: { valid: false, value: control.value } }
}
