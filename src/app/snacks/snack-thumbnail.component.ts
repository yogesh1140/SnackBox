import {Component, Input} from '@angular/core'
import {SnacksService} from './shared/snacks.service'
import {ISnackList} from './shared/snack.model'
@Component({
    selector: 'app-snack-thumbnail',
    template: `
    <div align="center" style="width:600px">
        <div *ngFor="let snack of this.snacks" class="well hoverwell thumbnail" [routerLink]="['/foodmenu',snack.snacksType]">
            <div>
                <img style="max-width:200px;" [src]=snack?.imageUrl/>
                <h1>{{snack.snacksType}}</h1>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .thumbnail {
            min-height: 250px;
            max-width:250px !important;
            margin-right: 50px;
            position:relative;
            float:left;
        }
        .well div { color: #bbb; }
        .thumbnail img{
            min-height: 210px;
            max-height: 200px;}
    `]
})
export class SnackThumbnailComponent {
  @Input() snacks: ISnackList[]
}
