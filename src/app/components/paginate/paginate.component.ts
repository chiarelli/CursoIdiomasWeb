import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResponse } from 'src/app/dtos/pagination-response';

@Component({
  selector: 'app-paginate',
  imports: [],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss'
})
export class PaginateComponent {

  @Input() paginate!: PaginatedResponse<any>;
  @Input() displayTotal: boolean = false;
  
  @Output() nextPageClicked = new EventEmitter<void>();
  @Output() previousPageClicked = new EventEmitter<void>();

  previousPage() {
    if (this.paginate.page > 1) {
      this.paginate.page--;
      this.previousPageClicked.emit();
    }
  }

  nextPage() {
    if (this.paginate.page < this.paginate.total_pages) {
      this.paginate.page++;
       this.nextPageClicked.emit();
    }
  }

}
