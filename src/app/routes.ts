import { Routes } from '@angular/router'
import {HomeComponent} from './home.component'
import {FoodMenuComponent} from './food-menu.component'
import {SnackListComponent} from './snacks/snacks-list.component'
import {SnackListRouteActivator} from './snacks/snack-list-route.activator'
import {FoodMenuResolverService} from './food-menu.resolver.service'
import {SnacksListResolver} from './snacks/snack-list.resolver'

import { Error404Component } from './errors/404.component'
import {CartComponent} from './snacks/orders/cart.component'
import {OrdersComponent} from './snacks/orders/orders.component'

import {UserDataRouteActivator} from './user-data-route.activator'

export const appRoutes: Routes = [
//   { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
//   { path: 'events', component: EventsListComponent, resolve: {events: EventListResolver}},
//   { path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver}},
//   { path: 'events/session/new', component: CreateSessionComponent },
{ path: 'home', component: HomeComponent},
{ path: 'foodmenu', component: FoodMenuComponent, canActivate: [UserDataRouteActivator], resolve: {menu: FoodMenuResolverService}},
{ path: 'foodmenu/cart', component: CartComponent, canActivate: [UserDataRouteActivator]},
{ path: 'foodmenu/orders', component: OrdersComponent, canActivate: [UserDataRouteActivator]},
{ path: 'foodmenu/:snackType', component: SnackListComponent, canActivate: [SnackListRouteActivator,
   UserDataRouteActivator], resolve: {snacks: SnacksListResolver}},
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
]
