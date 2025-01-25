import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateBeforeDash',
  standalone: true,
})
export class TruncateBeforeDashPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // Verifica se o valor é nulo ou indefinido.
    return value.substring(0, 3);
  }
}
