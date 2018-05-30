import {Component} from '@angular/core'
@Component({
    selector : 'app-footer',
    template : `
        <div class="row footer" style="min-height:50px">
        <div class="col-md-1">
        <img src="../assets/images/home-delivery.png" >
        </div>
        <div class="col-md-8" >
            <span >Order you favourite snack Online.We will ensure you get the same at your door step within 30mins</span>
        </div>
        <div class="col-md-3">
        <span>
            <a href="#" class="pointable">Mission</a>|
            <a href="#" class="pointable">Disclaimer</a>|
            <a href="#" class="pointable">Contact Us</a>
        </span>
        <br/>
        <span>All Rights Reserved&copy;</span>
        </div>
    `
})
export class FooterComponent {

}
