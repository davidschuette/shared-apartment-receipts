import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'monthString',
})
export class MonthStringPipe implements PipeTransform {
  private readonly months = {
    0: 'Januar',
    1: 'Februar',
    2: 'März',
    3: 'April',
    4: 'Mai',
    5: 'Juni',
    6: 'Juli',
    7: 'August',
    8: 'September',
    9: 'Oktober',
    10: 'November',
    11: 'Dezember',
  }

  transform(value: string): string {
    return this.months[value]
  }
}
