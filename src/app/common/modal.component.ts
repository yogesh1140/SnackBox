import {Component, Input, ViewChild, ElementRef, Inject} from '@angular/core'
import {JQ_Token} from './jquery.service'
@Component({
    selector: 'app-modal',
    template: `
        <div id="{{elementId}}" #modalcontainer class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" >
                        <ng-content></ng-content>
                        <div class="modal-footer" >
                            <button class="btn btn-default" (click)="closeModal()">Cancel</button>
                            <button class="btn btn-primary" (click)="closeModal();funcOK();">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

})
export class ModalComponent {
    @Input() title: string
    @Input() elementId: string
    @ViewChild('modalcontainer') containerEl: ElementRef
    // @Input() closeOnBodyClick: string
    @Input() funcOK: Function;
    constructor(@Inject(JQ_Token) private $: any) {

    }
    closeModal() {
        // if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
            this.$(this.containerEl.nativeElement).modal('hide')
        // }
    }

}
