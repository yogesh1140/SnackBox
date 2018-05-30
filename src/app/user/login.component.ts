import {Component, Inject} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'
import {AuthService} from './auth.service'
import {OrderService} from '../snacks/orders/shared/order.service'
import {ICartItem} from '../snacks/orders/shared/order.model'
import {JQ_Token} from '../common/jquery.service'


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .inner-addon {
        position: relative;
    }
    .inner-addon .glyphicon {
      position: absolute;
      padding: 10px;
      pointer-events: none;
    }
    .left-addon .glyphicon  { left:  0px;}
    .right-addon .glyphicon { right: 0px;}
    .left-addon input  { padding-left:  30px; }
    .right-addon input { padding-right: 30px; }
  `]
})
export class LoginComponent {
    constructor(private auth: AuthService , private orderService: OrderService, private router: Router, @Inject(JQ_Token) private $: any) {

    }
    public loginInvalid = false;
    public mouseoverLogin = false;
    public userName: string;
    public password: string;
    login(loginFormValue) {
        this.auth.loginUser(loginFormValue.userName, loginFormValue.password, loginFormValue.remember_me).subscribe(() => {
            if (this.auth.isAuthenticated()) {
                this.$('#login').modal('hide')
                this.router.navigate(['/home'])
                // this.router.navigate(['/foodmenu'])
            } else {
                this.loginInvalid = true;
            }
        })
         // console.log('valid: ', this.auth.isAuthenticated(), 'user', this.auth.currentUser)

    }
    cancel() {
        this.router.navigate(['/home'])
    }
}
