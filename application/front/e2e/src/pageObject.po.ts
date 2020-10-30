import { browser } from 'protractor';

import { Helpers } from './helpers';

const helpers: Helpers = new Helpers();

export abstract class PageObject {
  public readonly URL: string;

  public navigateTo() {
    return browser.get(this.URL);
  }

  public isRedirectedTo(url = this.URL) {
    return helpers.isRedirectedTo(url);
  }
}
