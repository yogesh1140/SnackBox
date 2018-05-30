import { Injectable} from '@angular/core'
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router'
import {SnacksService} from './shared/snacks.service'
@Injectable()
export class SnackListRouteActivator implements CanActivate {
    constructor(private snackService: SnacksService, private router: Router) {
          }
    canActivate(route: ActivatedRouteSnapshot) {
        const snackTypeExist = !!this.snackService.getSnacks(route.params['snackType'])
            if (!snackTypeExist) {
                this.router.navigate(['/404'])
            }
            return snackTypeExist
    }
}
