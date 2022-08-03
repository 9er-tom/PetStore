import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstLetters'
})
export class FirstLettersPipe implements PipeTransform {

  transform(value: string, index = 0): string {
    if (value != undefined)
      return value.substring(0, index);
    return "";
  }

}


