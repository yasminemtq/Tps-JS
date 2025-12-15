import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookName',
  standalone: true
})
export class BookNamePipe implements PipeTransform {
  transform(value: string): string {
    return value ? `The name of the book is ${value.toUpperCase()}` : '';
  }
}
