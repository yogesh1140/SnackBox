import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { SnacksService } from './shared/snacks.service'

@Injectable()
export class SnacksListResolver implements Resolve<any> {
  constructor(private snacksService: SnacksService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.snacksService.getSnacks(route.params['snackType']);
  }
}
