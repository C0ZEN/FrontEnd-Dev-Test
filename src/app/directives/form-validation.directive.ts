import {Directive, HostBinding, Optional} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormControlName,
  FormGroupDirective,
  NgControl
} from "@angular/forms";

@Directive({
  selector: '[appFormValidation]'
})
export class FormValidationDirective {

  constructor(
    @Optional() private ngControl?: NgControl,
    @Optional() private formControl?: FormControl,
    @Optional() private formControlName?: FormControlName,
    @Optional() private controlContainer?: ControlContainer
  ) {
  }

  get control(): AbstractControl | undefined {
    if (this.controlContainer && this.formControlName) {
      return this.controlContainer?.formDirective?.getControl(this.formControlName);
    } else if (this.ngControl) {
      return this.ngControl.control || undefined;
    } else {
      return this.formControl || undefined;
    }
  }

  get isFormSubmitted(): boolean {
    return !!this.controlContainer && (this.controlContainer as FormGroupDirective).submitted;
  }

  @HostBinding('class')
  get validationClass(): string | null {
    if (!!this.control && (this.control.touched || this.isFormSubmitted)) {
      return this.control.valid ? 'is-valid' : 'is-invalid';
    } else {
      return null;
    }
  }
}
