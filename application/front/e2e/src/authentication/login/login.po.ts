import { Helpers } from '../../helpers';
import { PageObject } from '../../pageObject.po';

const helpers = new Helpers();

export class LoginPage extends PageObject {
    public readonly URL = 'auth/login';
    public readonly FORM = '#loginForm';
    public readonly API_ERROR = '#apiError';
    private readonly USERNAME = '#username';
    private readonly PASSWORD = '#password';
    private readonly SUBMIT_BTN = '#loginBtn';

    public async login(username: string, password: string): Promise<any> {
        try {
            await helpers.fillIn(this.USERNAME, username);
            await helpers.fillIn(this.PASSWORD, password);
            await helpers.click(this.SUBMIT_BTN);
            Promise.resolve(true);
        } catch (error) {
            Promise.reject(error);
        }
    }
}

