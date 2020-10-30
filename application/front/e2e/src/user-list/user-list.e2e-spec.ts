import { browser, logging } from 'protractor';

import { UserListPage } from './user-list.po';
import { Helpers } from './../helpers';

describe('USERS TESTS', () => {
  const helpers = new Helpers();
  let page: UserListPage;

  beforeEach(() => {
    page = new UserListPage();
  });

  it('should go to users page', () => {
    page.navigateTo();
    expect(page.URL).toEqual('users');
  });

  it('should display user-list', async () => {
    page.navigateTo();
    expect(helpers.isVisible(page.USER_LIST)).toBeTruthy();
  });

  it('should add new user', async () => {
    page.navigateTo();
    await helpers.click(page.USER_NEW_BTN);
    expect(await helpers.isVisible(page.USER_MODAL)).toBeTruthy();
    await page.addUser();
    await helpers.click(page.USER_SAVE_BTN);
    expect(await helpers.containsText(page.USER_LIST_FIRST_ITEM, 'aaa')).toBeTruthy();
  });

  it('should delete user', async () => {
    page.navigateTo();
    await helpers.click(page.USER_OPEN_BTN);
    expect(await helpers.isVisible(page.USER_MODAL)).toBeTruthy();
    await helpers.click(page.USER_DELETE_BTN);
    expect(await helpers.containsTextPromise(page.USER_LIST_FIRST_ITEM, 'aaa')).toBeFalsy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
