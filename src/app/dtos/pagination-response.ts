export class PaginatedResponse<T> {
  page: number = 1;
  size: number = 0;
  length: number = 0;
  total_query_count: number = 0;
  total_pages: number = 0;
  content: T[] = [];

  constructor(
    page: number,
    size: number,
    length: number,
    total_query_count: number,
    total_pages: number,
    content: T[]
  ) {
    this.page = page;
    this.size = size;
    this.length = length;
    this.total_query_count = total_query_count;
    this.total_pages = total_pages;
    this.content = content;
  }
}
