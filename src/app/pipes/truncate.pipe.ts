import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    if (!value) return ''; // Handle empty values
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
