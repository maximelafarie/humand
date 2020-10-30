import { Helpers } from '../helpers';
import { PageObject } from '../pageObject.po';

const helpers = new Helpers();

export class UserListPage extends PageObject {
    public readonly URL = 'users';
    public readonly USER_LIST = '#ngx-datatable-user';
    public readonly USER_LIST_FIRST_ITEM = this.USER_LIST + ' > div > datatable-body > datatable-selection > datatable-scroller > datatable-row-wrapper:nth-child(1) > datatable-body-row > div.datatable-row-center.datatable-row-group > datatable-body-cell:nth-child(2) > div > span';
    public readonly USER_NEW_BTN = '.new-user-btn';
    public readonly USER_OPEN_BTN = '.action-btn';
    public readonly USER_MODAL = 'ngx-smart-modal[identifier=userModal]';
    public readonly USER_FORM = '#userForm';
    public readonly USER_SAVE_BTN = '.save-btn';
    public readonly USER_DELETE_BTN = '.delete-btn';

    private userToAdd = {
        id: '',
        lastName: 'aaa',
        firstName: 'aaa',
        email: 'aaa@aaa.fr',
        roles: ['ROLE_EDITOR'],
        formulationValidator: false,
        processValidator: false,
        pigmentationValidator: false,
        complianceValidator: false
    };

    public async addUser(): Promise<any> {
        try {
            await helpers.fillIn('#lastName', this.userToAdd.lastName);
            await helpers.fillIn('#firstName', this.userToAdd.firstName);
            await helpers.fillIn('#email', this.userToAdd.email);
            await helpers.selectInNgSelect('#role', 'Editor');
            Promise.resolve(true);
        } catch (error) {
            Promise.reject(error);
        }
    }
}
