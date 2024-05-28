import { UntypedFormControl } from "@angular/forms";

export function checkName(input: UntypedFormControl) {
    const hasNumber = /[0-9]/.test(input.value);

    if (hasNumber) return { hasNumber: true };
    else {
        const name = input.value.split(' ');

        const filtrado = name.filter((x: string) => {
            if (x != '' && x.length > 1) return { isNameComplete: true };

            return null;
        });

        return filtrado.length < 2 ? { isNameComplete: true } : null;
    }
}