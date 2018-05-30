import {Component, Input, OnInit, ElementRef , Inject} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'
import {ISnack} from './shared/snack.model'
import {SnacksService} from './shared/snacks.service'
import {FormGroup, FormControl} from '@angular/forms'
import {Toastr_Token} from '../common/toastr.service'
import {IToastr} from '../common/toastr.model'
import {CartComponent} from './orders/cart.component'


@Component({
    templateUrl: '../snacks/snacks-list.component.html',
    styles: [`
    `]
})
export class SnackListComponent implements OnInit {
    selectedSize: string
    snackType: string
    snacks: ISnack[]
    constructor(private cart: CartComponent, private snackService: SnacksService,
        private route: ActivatedRoute, @Inject(Toastr_Token) private toastr: IToastr) {}
    ngOnInit() {
       // console.log('sType:', this.snackType, )
        this.route.data.forEach((data) => {
            this.snackType = this.route.snapshot.params['snackType']
                this.snacks = data['snacks'];
            // this.snackService.getSnacks(params['snackType']).subscribe((snack) => console.log('snack:', snack.snacks))
            // this.snackService.getSnacks(params['snackType']).subscribe((snacks: ISnack[]) => {  this.snacks = snacks})
            // console.log(this.snacks)
        })
    }
    getPrice(sz: ISnack, sel: string) {
            const retVal = sz.availableSizes.find(s => s.size === sel)
            if (retVal !== undefined) {
                return retVal.price
            } else {
                return 0
            }
    }
    addToCart(formValues, snackId: number) {
        const snack = this.snacks.find(sk => sk.id === snackId)
        if (formValues.selectedSize === null) {
            this.toastr.error('Please select size for item ', snack.name)
            return;
        }
        // console.log(snack.name, formValues.selectedSize,
        //     snack.availableSizes.find(as => as.size === formValues.selectedSize).price, formValues.qty)
         this.cart.addToCart(this.snackType, snack.imageUrl, snack.name,
            snack.availableSizes.find(as => as.size === formValues.selectedSize).price,
            formValues.selectedSize, +formValues.qty)
        this.toastr.success(snack.name + ' Added to Cart')
    }
}
