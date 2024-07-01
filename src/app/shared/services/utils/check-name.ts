import { FormControl } from '@angular/forms';

export function checkName(input: FormControl) {
  console.log(input.value);
  const value = input.value?.trim();

  if (!value) {
    console.log(value);
    return { required: true };
  }

  const nameParts = value
    .split(' ')
    .filter((part: string | any[]) => part.length > 1);

  return nameParts.length < 2 ? { isNameComplete: true } : null;
}
