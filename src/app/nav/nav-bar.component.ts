import {Component, Inject, ElementRef, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthService} from '../user/auth.service'
import {Toastr_Token} from '../common/toastr.service'
import {IToastr} from '../common/toastr.model'
import {OrderService} from '../snacks/orders/shared/order.service'
import {JQ_Token} from '../common/jquery.service'
@Component({
    selector : 'app-nav',
    templateUrl: '../nav/nav-bar.component.html',
    styles: [`
        .nav-btns a{
            color:White;
        }
        .numberCircle{
            border-radius: 50%;
            width: 5px;
            height: 5px;
            padding: 4px;
            background: #fff;
            color: #666;
            text-align: center;
        }
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
        .dropbtn {
            background-color: #4CAF50;
            color: white;
            padding: 16px;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .dropbtn {
            background-color: #4CAF50;
            color: white;
            padding: 16px;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        /* The container <div> - needed to position the dropdown content */
        .dropdown {
            position: relative;
            display: inline-block;
        }
        /* Dropdown Content (Hidden by Default) */
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 180px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }
        /* Links inside the dropdown */
        .dropdown-content a, .dropdown-content li {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }
        /* Change color of dropdown links on hover */
        .dropdown-content a:hover, .dropdown-content li:hover {background-color: #f1f1f1}
        /* Show the dropdown menu on hover */
        .dropdown:hover .dropdown-content {
            display: block;
        }
        /* Change the background color of the dropdown button when the dropdown content is shown */
        .dropdown:hover .dropbtn {
            background-color: #3e8e41;
        }
    `]
})

export class NavBarComponent implements OnInit {
    public loginInvalid = false;
    public mouseoverLogin = false;
    constructor (private auth: AuthService, private orderService: OrderService,
        private router: Router, @Inject(Toastr_Token) private toastr: IToastr, @Inject(JQ_Token) private $: any) {}
        ngOnInit() {
            this.$('#login').on('hidden.bs.modal', e => {
                this.$('#userName').val('')
                this.$('#password').val('')
              })
        }
    logout(): void {
        this.auth.logout().subscribe(() => {
            this.router.navigate(['/home'])
            this.toastr.success('You are logged out')
        })
    }
    changePassword(): void {

    }
    login(loginFormValue) {
        this.auth.loginUser(loginFormValue.userName, loginFormValue.password, loginFormValue.remember_me).subscribe(() => {
            if (this.auth.isAuthenticated()) {
                // this.orderService.getUserData(this.auth.currentUser.username)
                this.$('#userName').val('')
                this.$('#password').val('')
                this.$('#login').modal('hide')
                this.loginInvalid = false;
                this.router.navigate(['/home'])
               // this.router.navigate(['/foodmenu'])
            } else {
                this.loginInvalid = true;
            }
        })
         // console.log('valid: ', this.auth.isAuthenticated(), 'user', this.auth.currentUser)

    }
    resetInvalidFlag() {
        this.loginInvalid = false;
    }
    getFoodCartCount() {
        let  count = 0
        if (this.orderService.cartItems !== undefined) {
            this.orderService.cartItems.forEach(item => {
                count += item.quantity
            })
        }
        return count;
    }
}
