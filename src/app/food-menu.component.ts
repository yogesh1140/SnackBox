import {Component, OnInit} from '@angular/core'
import {SnacksService} from './snacks/shared/snacks.service'
import {ISnackList} from './snacks/shared/snack.model'
import {AuthService} from './user/auth.service'
import {ActivatedRoute} from '@angular/router'
@Component({
    template: `
    <div align="center">
        <span style="font-size:18px;"><em>Dear <b>{{ this.auth.currentUser?.username}}</b>, Please select your cuisine..</em></span>
        <br/><br/>
        <app-snack-thumbnail  [snacks]="this.snackMenu"></app-snack-thumbnail>
    </div>
    `
})
export class FoodMenuComponent implements OnInit {
    snackMenu: ISnackList[]
    constructor(private snackService: SnacksService, private auth: AuthService, private route: ActivatedRoute) {
        // this.snackMenu = this.snackService.getMenu()
    }
    ngOnInit() {
        this.snackMenu =  this.snackService.snacksList = this.route.snapshot.data['menu']
        // this.snackMenu = this.route.snapshot.data['menu']
    }
}
