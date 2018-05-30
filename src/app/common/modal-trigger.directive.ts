import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core'
import { JQ_Token } from './jquery.service'

@Directive({
  selector: '[appModalTrigger]'
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement
  @Input('appModalTrigger') modalId: string

  constructor(ref: ElementRef, @Inject(JQ_Token) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({})
    })
  }
}
