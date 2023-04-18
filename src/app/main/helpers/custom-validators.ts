import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  public static populationValidator(
    population: FormControl
  ): ValidationErrors | null {
    if (population?.value < 0) {
      return { min: true };
    }

    return null;
  }
}
