import { Directive, OnInit } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS, AbstractControl, FormControl } from '@angular/forms';
import {AuthService} from './auth.service'

@Directive({
  selector: '[appValidateUsername]',
  providers: [{provide: NG_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true}]
})
export class UsernameValidatorDirective implements Validator {
    constructor(private auth: AuthService) {}

validate(control: AbstractControl): { [key: string]: any } {
    // console.log('inside validator')
    if (!this.auth.checkIfExists(control.value || undefined)) {
      return null;
    } else {
      return {appValidateUsername: false}
    }
  }
}
