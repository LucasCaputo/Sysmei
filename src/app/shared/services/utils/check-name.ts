import { FormControl } from '@angular/forms';

export function IsNameCompleted(input: FormControl): boolean {
  const value = input.value?.trim();

  if (!value) {
    return false;
  }

  const nameParts = value.split(' ');

  return nameParts.length <= 1;
}
