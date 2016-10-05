import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByScore'
})
export class OrderByScorePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.sortBy(value, ['score']).reverse();
  }

}
