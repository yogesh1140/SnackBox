import {Component, OnInit, Inject} from '@angular/core'
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import {Router} from '@angular/router'
import {Toastr_Token} from '../common/toastr.service'
import {IToastr} from '../common/toastr.model'
import {AuthService} from './auth.service'
import {OrderService} from '../snacks/orders/shared/order.service'
import {UsernameValidatorDirective} from './username.validator'
@Component({
    templateUrl: './signup.component.html',
    styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input, .error select, .error textarea {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :ms-input-placeholder  { color: #999; }
    .valid{background-color:#1AF984}
  `]
})
export class SignUpComponent implements OnInit {
    un: string
    signupForm: FormGroup
    username: FormControl
    email: FormControl
    mobile: FormControl
    gender: FormControl
    password: FormControl
    confirmPassword: FormControl
    constructor( @Inject(Toastr_Token) private toastr: IToastr, private router: Router,
    private auth: AuthService, private orderService: OrderService) {
    }

    ngOnInit() {
      this.username = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+[a-zA-Z0-9_-]*$')])
      this.email = new FormControl('', [Validators.required, Validators.email]);
      this.mobile = new FormControl('', Validators.required);
      this.gender = new FormControl('', Validators.required);
      this.password = new FormControl('', [Validators.required]);
      this.confirmPassword = new FormControl('', [Validators.required, validatePassword('password')]);
      this.signupForm = new FormGroup({
        username: this.username,
        email: this.email,
        mobile: this.mobile,
        gender: this.gender,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
    }
    signup(formvalues) {
      this.auth.registerUser(formvalues.email, formvalues.mobile, formvalues.gender,
        formvalues.password, formvalues.username).subscribe((resp) => {
          // console.log(resp)
          if (resp._body !== 'null') {
            this.toastr.error('Username alreay taken!')
          } else {
            this.router.navigate(['/home'])
            this.toastr.success('Registration Details Saved')
          }
      })
      // this.orderService.addUserData(formvalues.username)
    }
    cancel() {
    }
}
export function validatePassword(pwdField: string) {
    return (control: FormControl):  { [key: string]: any } => {
    if (!control.root.get(pwdField)) {
      return null
    }
    return control.value === control.root.get(pwdField).value ? null : {
      validatePassword: {
        valid: false
      }
    }
  }
}


