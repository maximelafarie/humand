import { Injectable } from '@angular/core';

import { Dictionary } from '@app/models';
import { DictionaryApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private dictionnaires: Dictionary[] = [];
  private loading = false;
  private dicoName = null;
  private promise = null;

  constructor(
    private dictionnaireApiService: DictionaryApiService
  ) { }

  public getDictionaryByName(name: string): Promise<any> {
    const searchedDico = this.dictionnaires.find(dico => dico.name === name);

    if (!!this.dictionnaires && !!searchedDico) {
      return new Promise((resolve) => {
        resolve(searchedDico);
      });
    } else if (this.loading && this.dicoName === name) {
      return this.promise;
    }

    this.loading = true;
    this.dicoName = name;

    this.promise = new Promise((resolve, reject) => {
      this.dictionnaireApiService.getDictionary(name).subscribe(res => {
        this.loading = false;
        this.dictionnaires.push(res);
        resolve(res);
      }, err => {
        reject('error');
      });
    });

    return this.promise;
  }
}
