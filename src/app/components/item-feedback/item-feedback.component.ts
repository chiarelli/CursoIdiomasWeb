import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ErrosAPIResponse } from 'src/app/dtos/errors-response';

@Component({
  selector: 'app-item-feedback',
  imports: [
    CommonModule
  ],
  templateUrl: './item-feedback.component.html',
  styleUrl: './item-feedback.component.scss'
})
export class ItemFeedbackComponent {
  @Input() apiErrors = new ErrosAPIResponse({});
  @Input() successMsg: string = '';
}
