import {Directive, HostBinding} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  /* tslint:disable:directive-selector */
  selector: '.form-control'
})
export class FormControlValidationDirective {

  constructor(private ngControl: NgControl) { }

  @HostBinding('class.is-invalid') get isInvalid(): boolean {
    if (this.ngControl && this.ngControl.dirty && this.ngControl.invalid) {
      return true;
    }
    return false;
  }

}
