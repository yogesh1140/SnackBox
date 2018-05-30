import {NgModule} from '@angular/core'
import {LoginComponent} from './login.component'
import {SignUpComponent} from './signup.component'
import {RouterModule} from '@angular/router'
import {userRoutes} from './user.routes'
import { CommonModule } from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {UsernameValidatorDirective} from './username.validator'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes),
    ],
    declarations: [
        LoginComponent,
        SignUpComponent,
        UsernameValidatorDirective
    ],
    providers: []
})
export class UserModule {

}
