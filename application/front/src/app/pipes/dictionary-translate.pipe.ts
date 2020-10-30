import { Pipe, PipeTransform } from '@angular/core';

import { DictionaryService } from '@app/services';
import { Dictionary } from '@app/models';

@Pipe({
  name: 'dictionaryTranslate'
})
export class DictionaryTranslatePipe implements PipeTransform {

  constructor(private dictionaryService: DictionaryService) {
  }

  transform(value: string, options: any): Promise<string> {
    if (!value.length) {
      return Promise.resolve('');
    }

    const dictionaryName = options.dictionary;

    return this.dictionaryService.getDictionaryByName(dictionaryName).then((res: Dictionary) => {
      return new Promise<string>((resolve) => {
        const result = res.entries.find(term => {
          return term.key === value;
        });

        if (!result) {
          resolve(value);
        } else if (!!options.field) {
          resolve(result.value[options.field]);
        } else {
          resolve(result.value);
        }
      });
    });
  }

}
