import {Injectable} from '@angular/core'
import {Resolve} from '@angular/router'
import {SnacksService} from './snacks/shared/snacks.service'
@Injectable()
export class FoodMenuResolverService implements Resolve<any> {
    constructor(private snacksService: SnacksService) {}
    resolve() {
        return this.snacksService.getMenu();
    }
}
