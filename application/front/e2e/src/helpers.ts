import { protractor, browser, $, $$, by, element, WebElement } from 'protractor';
const path = require('path');
const fs = require('fs');
const chai = require('chai').use(require('chai-as-promised'));

const expect = chai.expect;
const EC = protractor.ExpectedConditions;
const waitTimeout = 5000;

export class Helpers {
  public async fillIn(selector: string, value: string): Promise<any> {
    try {
      const input = $(selector);
      await browser.wait(EC.visibilityOf(input), waitTimeout);
      await input.clear();
      await input.sendKeys(value);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async fillForm(value: object): Promise<any> {
    try {
      Object.keys(value).forEach(async item => {
        const input = $('#' + item);
        await browser.wait(EC.visibilityOf(input), waitTimeout);
        await input.clear();
        await input.sendKeys(value[item]);
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async click(selector: string): Promise<any> {
    try {
      const input = $(selector);
      await browser.wait(EC.elementToBeClickable(input), waitTimeout);
      await input.click();
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async isVisible(selector: string): Promise<boolean> {
    try {
      const isVisible = await this.isVisiblePromise(selector);
      expect(isVisible).to.equal(true);
      return Promise.resolve(isVisible);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async isInvisible(selector: string): Promise<boolean> {
    try {
      const isInvisible = await this.isInvisiblePromise(selector);
      expect(isInvisible).to.equal(true);
      return Promise.resolve(isInvisible);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async isVisiblePromise(selector: string): Promise<boolean> {
    try {
      const input = $(selector);
      await browser.wait(EC.visibilityOf(input), waitTimeout);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }

  private async isInvisiblePromise(selector: string): Promise<boolean> {
    try {
      const input = $(selector);
      await browser.wait(EC.invisibilityOf(input), waitTimeout);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }

  public async isPresent(selector: string): Promise<boolean> {
    try {
      const isPresent = await this.isPresentPromise(selector);
      expect(isPresent).to.equal(true);
      return Promise.resolve(isPresent);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async isPresentPromise(selector: string): Promise<boolean> {
    try {
      const input = $(selector);
      await browser.wait(EC.presenceOf(input), waitTimeout);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }

  public async hasCheckedValue(selector: string, checkedValue: boolean = true): Promise<boolean> {
    try {
      await this.isPresent(selector);
      const checked = await $(selector).isSelected();
      await expect(checked).to.equal(checkedValue);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async isRedirectedTo(url: string): Promise<boolean> {
    try {
      let browserCurrentUrl = '';

      const condition = EC.and(() => {
        return browser.getCurrentUrl().then(currentUrl => {
          browserCurrentUrl = currentUrl;
          return currentUrl === browser.baseUrl + url;
        });
      });

      await browser.wait(condition, 5000);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(new Error('Redirection to ' + url + ' failed'));
    }
  }

  public async hasValue(selector: string, text: string) {
    return this.hasAttributeValue(selector, 'value', text);
  }

  public async containsText(selector: string, text: string) {
    const input = $(selector);
    try {
      await expect(input.getText()).to.eventually.equal(text);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async containsTextPromise(selector: string, text: string): Promise<boolean> {
    const input = $(selector);
    try {
      await expect(input.getText()).to.eventually.equal(text);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }

  public async matchesText(selector: string, regexp: RegExp) {
    const input = $(selector);
    try {
      await expect(input.getText()).to.eventually.match(regexp);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async takeScreenshot(fileName) {
    const tempErrorFile = [];

    const base64png = await browser.takeScreenshot();
    if (!tempErrorFile[fileName]) {
      tempErrorFile[fileName] = 0;
    }
    tempErrorFile[fileName]++;

    if (!fs.existsSync('e2e/screenshots')) {
      fs.mkdirSync(path.resolve('e2e/screenshots'));
    }

    const stream = fs.createWriteStream(path.resolve('e2e/screenshots') + '/' + fileName + '-' + tempErrorFile[fileName] + '.png');
    stream.write(Buffer.from(base64png, 'base64'));
    stream.end();
  }

  public async hasAttributeValue(selector: string, attributeName: string, valueToFind: string): Promise<boolean> {
    try {
      const value = await $(selector).getAttribute(attributeName);
      await expect(value).to.equal(valueToFind);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async equalsNbElements(selector: string, nb): Promise<boolean> {
    try {
      await expect($$(selector).count()).to.eventually.equal(parseInt(nb, 10));
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async greaterThanNbElements(selector: string, nb): Promise<boolean> {
    try {
      await expect($$(selector).count()).to.eventually.above(parseInt(nb, 10));
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async selectInNgSelect(ngSelectSelector: string, label: string): Promise<boolean> {
    try {
      await this.isVisible(ngSelectSelector);
      await this.click(ngSelectSelector);
      await element(by.cssContainingText(ngSelectSelector + ' .ng-option .ng-option-label', label)).click();
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async hoverElement(elt: WebElement): Promise<any> {
    return browser.actions().mouseMove(elt).perform();
  }

  public sleep(milliseconds: number): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }
}
