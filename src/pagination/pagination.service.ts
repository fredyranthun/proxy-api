import { Injectable } from '@nestjs/common';
import { PaginatedData } from './paginated-data.interface';

@Injectable()
export class PaginationService {
  paginate<T>(data: T[], page: number, size: number): PaginatedData<T> {
    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / size);
    const currentPage = page;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        totalRecords,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
      },
    };
  }
}
