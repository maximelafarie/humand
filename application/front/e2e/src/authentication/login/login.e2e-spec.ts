import { browser, logging } from 'protractor';

import { LoginPage } from './login.po';
import { Helpers } from '../../helpers';

describe('LOGIN TESTS', () => {
  const helpers = new Helpers();
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should go to login page', () => {
    page.navigateTo();
    expect(page.URL).toEqual('auth/login');
  });

  it('should display login form', () => {
    page.navigateTo();
    expect(helpers.isVisible(page.FORM)).toBeTruthy();
  });

  it('should login with wrong credentials', async () => {
    page.navigateTo();
    await page.login('user-editor@humand.fr', 'wrongPassword');
    expect(await helpers.isVisible(page.API_ERROR)).toBeTruthy();
  });

  it ('should login with good credentials', async () => {
    page.navigateTo();
    page.login('user-editor@humand.fr', 'Pwd111111$');

    expect(await helpers.isInvisible(page.API_ERROR)).toBeTruthy();
    expect(await page.isRedirectedTo('')).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});
