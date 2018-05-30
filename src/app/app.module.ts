import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';

import { Error404Component} from './errors/404.component';
import {NavBarComponent} from './nav/nav-bar.component'
import {FooterComponent} from './footer/footer.component'
import {appRoutes} from './routes'
import {HomeComponent} from './home.component'
import {Toastr_Token} from './common/toastr.service'
import {IToastr} from './common/toastr.model'
import {JQ_Token} from './common/jquery.service'
import {AuthService} from './user/auth.service'
import {FoodMenuComponent} from './food-menu.component'
import {SnackThumbnailComponent} from './snacks/snack-thumbnail.component'
import {SnacksService} from './snacks/shared/snacks.service'
import {SnackListComponent} from './snacks/snacks-list.component'
import {SnackListRouteActivator} from './snacks/snack-list-route.activator'
import {FormsModule} from '@angular/forms'
import {OrderService } from './snacks/orders/shared/order.service'
import {CartComponent } from './snacks/orders/cart.component'
import {OrdersComponent } from './snacks/orders/orders.component'
import {ModalTriggerDirective} from './common/modal-trigger.directive'
import {ModalComponent} from './common/modal.component'
import {UserDataRouteActivator} from './user-data-route.activator'
import {OrderItemDetailsComponent} from './snacks/orders/order-item-details.component'
import {UsernameValidatorDirective} from './user/username.validator'
import {FoodMenuResolverService} from './food-menu.resolver.service'
import {SnacksListResolver} from './snacks/snack-list.resolver'

export declare let toastr: IToastr
export declare let jQuery: any
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    Error404Component,
    HomeComponent,
    FoodMenuComponent,
    SnackThumbnailComponent,
    SnackListComponent,
    CartComponent,
    ModalTriggerDirective,
    ModalComponent,
    OrdersComponent,
    OrderItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    AuthService,
    SnacksService,
    {provide: Toastr_Token, useValue: toastr},
    {provide: JQ_Token, useValue: jQuery},
    SnackListRouteActivator,
    OrderService,
    CartComponent,
    UserDataRouteActivator,
    FoodMenuResolverService,
    SnacksListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
