import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatatableParamsService, DictionaryService, UserApiService } from '@app/services';
import { User, DictionaryEntry, Dictionary, Role } from '@app/models';
import { emailCheckValidator } from '@app/validators';

import { Subscription } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public loading = false;
  public columns;
  public users: User[] = [];
  public datatableParams: DatatableParamsService;
  public userForm: FormGroup;

  public dictionaries = {
    roles: [] as DictionaryEntry[]
  };

  public customErrors = [];

  private subs = new Subscription();

  public get isValidator(): boolean {
    return this.userForm.get('roles').value === Role.Validator;
  }

  constructor(
    private datatableParamsService: DatatableParamsService,
    private userApiService: UserApiService,
    private modalService: NgxSmartModalService,
    private fb: FormBuilder,
    private dictionaryService: DictionaryService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subscribeValidations();
    this.initDictionaries();
    this.initDatatableColumns();
    this.initDatatableParams();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      id: [''],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, emailCheckValidator()]],
      roles: ['', [Validators.required]],
      formulationValidator: [false],
      processValidator: [false],
      pigmentationValidator: [false],
      complianceValidator: [false]
    });
  }

  private initDatatableColumns(): void {
    this.columns = {
      lastName: { prop: 'lastName', name: 'Name' },
      firstName: { prop: 'firstName', name: 'Firstname' },
      role: { prop: 'roles', name: 'Role' },
      formulationValidator: { prop: 'formulationValidator', name: 'Formulation' },
      processValidator: { prop: 'processValidator', name: 'Process' },
      pigmentationValidator: { pigmentationValidator: 'pigmentationValidator', name: 'Pigmentation' },
      complianceValidator: { complianceValidator: 'complianceValidator', name: 'Compliance' }
    };
  }

  private async initDictionaries(): Promise<void> {
    await this.dictionaryService.getDictionaryByName('user_role').then((res: Dictionary) => {
      this.dictionaries.roles = res.entries;
    });
  }

  private initDatatableParams(): void {
    this.datatableParams = this.datatableParamsService.create('users', { limit: 25 });
    this.datatableParams.setOrder('lastName');

    this.subs.add(this.datatableParams.onParamChange().subscribe(() => this.loadUsers()));
  }

  private loadUsers(): void {
    this.loading = true;

    const tableParams = this.datatableParams.getParams();

    this.subs.add(this.userApiService.getUsers(tableParams).subscribe((res: User[]) => {
      this.loading = false;
      this.users = res['hydra:member'];
    }));
  }

  private reload(): void {
    this.loadUsers();
  }

  private resetUserForm(): void {
    this.userForm.reset({
      id: '',
      lastName: '',
      firstName: '',
      email: '',
      roles: null,
      formulationValidator: false,
      processValidator: false,
      pigmentationValidator: false,
      complianceValidator: false
    });
  }

  private resetValidations(): void {
    this.userForm.patchValue({
      formulationValidator: false,
      processValidator: false,
      pigmentationValidator: false,
      complianceValidator: false
    });
  }

  private subscribeValidations(): void {
    // I need to subscribe validations for reset each custom error
    this.subs.add(this.userForm.get('roles').valueChanges.subscribe(() => {
      this.userForm.get('formulationValidator').setErrors(null);
      this.userForm.get('processValidator').setErrors(null);
      this.userForm.get('pigmentationValidator').setErrors(null);
      this.userForm.get('complianceValidator').setErrors(null);
    }));
    this.subs.add(this.userForm.get('formulationValidator').valueChanges.subscribe(() => {
      this.userForm.get('formulationValidator').setErrors(null);
      this.userForm.get('processValidator').setErrors(null);
      this.userForm.get('pigmentationValidator').setErrors(null);
      this.userForm.get('complianceValidator').setErrors(null);
    }));
    this.subs.add(this.userForm.get('processValidator').valueChanges.subscribe(() => {
      this.userForm.get('formulationValidator').setErrors(null);
      this.userForm.get('processValidator').setErrors(null);
      this.userForm.get('pigmentationValidator').setErrors(null);
      this.userForm.get('complianceValidator').setErrors(null);
    }));
    this.subs.add(this.userForm.get('pigmentationValidator').valueChanges.subscribe(() => {
      this.userForm.get('formulationValidator').setErrors(null);
      this.userForm.get('processValidator').setErrors(null);
      this.userForm.get('pigmentationValidator').setErrors(null);
      this.userForm.get('complianceValidator').setErrors(null);
    }));
    this.subs.add(this.userForm.get('complianceValidator').valueChanges.subscribe(() => {
      this.userForm.get('formulationValidator').setErrors(null);
      this.userForm.get('processValidator').setErrors(null);
      this.userForm.get('pigmentationValidator').setErrors(null);
      this.userForm.get('complianceValidator').setErrors(null);
    }));
  }

  private setViolations(errors: []): void {
    errors.forEach((err: { propertyPath: string, message: string }) => {
      if (this.userForm.get(err.propertyPath)) {
        this.userForm.get(err.propertyPath).setErrors({ incorrect: true, message: err.message });
      }
      // Custom property
      switch (err.propertyPath) {
        case 'validatorType':
          this.customErrors.push(err);
          this.userForm.get('formulationValidator').setErrors({ incorrect: true, message: err.message });
          this.userForm.get('processValidator').setErrors({ incorrect: true, message: err.message });
          this.userForm.get('pigmentationValidator').setErrors({ incorrect: true, message: err.message });
          this.userForm.get('complianceValidator').setErrors({ incorrect: true, message: err.message });
          break;
      }
    });
  }

  public openUser(user: User): void {
    this.resetUserForm();
    this.userForm.patchValue({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      roles: user.roles[0],
      formulationValidator: user.formulationValidator,
      processValidator: user.processValidator,
      pigmentationValidator: user.pigmentationValidator,
      complianceValidator: user.complianceValidator
    });
    this.modalService.open('userModal');
  }

  public createUser(): void {
    this.resetUserForm();
    this.modalService.open('userModal');
  }

  public saveUser(): void {
    if (!this.isValidator) {
      this.resetValidations();
    }

    const userFormValue = { ...this.userForm.value };

    // To match with api which want a array
    userFormValue.roles = [userFormValue.roles];

    if (this.userForm.get('id').value) {
      this.userApiService.saveUser(userFormValue).subscribe(() => {
        this.reload();
        this.modalService.close('userModal');
      }, err => {
        this.setViolations(err.error.violations);
      });
    } else {
      // We don't want id because it's a new user
      delete userFormValue.id;

      this.userApiService.createUser(userFormValue).subscribe(() => {
        this.reload();
        this.modalService.close('userModal');
      }, err => {
        this.setViolations(err.error.violations);
      });
    }
  }

  public deleteUser(): void {
    this.userApiService.deleteUser(this.userForm.get('id').value).subscribe(() => {
      this.reload();
      this.modalService.close('userModal');
    });
  }

}
