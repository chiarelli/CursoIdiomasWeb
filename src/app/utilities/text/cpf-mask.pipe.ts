import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask'
})
export class CpfMaskPipe implements PipeTransform {

  transform(value: string | number): string {
    const digits = value?.toString().replace(/\D/g, '');
    if (!digits || digits.length !== 11) return value.toString();
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
