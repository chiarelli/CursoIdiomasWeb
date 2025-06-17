import { Component, Input } from '@angular/core';
import { PaginatedResponse } from 'src/app/dtos/pagination-response';

@Component({
  selector: 'app-paginate',
  imports: [],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss'
})
export class PaginateComponent {

  @Input() paginate!: PaginatedResponse<any>;
  @Input() onNextPage: Function = () => {};
  @Input() onPreviousPage: Function = () => {};
  @Input() displayTotal: boolean = false;

  previousPage() {
    if (this.paginate.page > 1) {
      this.paginate.page--;
      this.onPreviousPage();
    }
  }

  nextPage() {
    if (this.paginate.page < this.paginate.total_pages) {
      this.paginate.page++;
      this.onNextPage();
    }
  }

}
