import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";
@Pipe({
  name: 'orderByTitle'
})
export class OrderByTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.sortBy(value, ['title']);
  }

}
