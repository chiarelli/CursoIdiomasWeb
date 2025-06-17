import { Component, Input } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';

@Component({
  selector: 'app-modal-exclusao-item',
  imports: [
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent
  ],
  templateUrl: './modal-exclusao-item.component.html',
  styleUrl: './modal-exclusao-item.component.scss'
})
export class ModalExclusaoItemComponent {

  @Input() confirmCallback: (() => void) = () => {};
  
  isVisible: boolean = false;

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }

}
