import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/api';
import { JwtHelperService } from '@app/helpers';
import { TokenStorageService, UserService } from '@app/services';
import { emailCheckValidator } from '@app/validators';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public loading = false;
  public error = '';

  private subs: Subscription = new Subscription();

  public get username() {
    return this.form.get('username');
  }

  public get password() {
    return this.form.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private jwtHelperService: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: ['', { updateOn: 'blur', validators: [Validators.required, emailCheckValidator()] }],
      password: ['', [Validators.required]]
    });

    if (window.history.state) {
      this.form.get('username').patchValue(window.history.state.username);
    }
  }

  private resetError(): void {
    this.error = '';
  }

  public login(): void {
    if (this.form.invalid) {
      return;
    }

    this.resetError();
    this.loading = true;

    this.subs.add(
      this.authService.login(this.form.value).subscribe(res => {
        this.loading = false;
        this.tokenService.setAuthToken(res.token);
        this.userService.setUser(this.jwtHelperService.decodeToken(res.token));
        this.router.navigate(['/']);
      }, err => {
        this.loading = false;
        this.error = err.error['hydra:description'];
      })
    );
  }

}
