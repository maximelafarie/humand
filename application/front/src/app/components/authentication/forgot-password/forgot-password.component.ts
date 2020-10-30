import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/api';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public loading = false;
  public error = '';

  private subs: Subscription = new Subscription();

  public get username() {
    return this.form.get('username');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required]
    });

    if (window.history.state) {
      this.form.get('username').patchValue(window.history.state.username);
    }
  }

  private resetError(): void {
    this.error = '';
  }

  public forgot(): void {
    if (this.form.invalid) {
      return;
    }

    this.resetError();
    this.loading = true;

    this.subs.add(this.authService.forgotPassword(this.username.value).subscribe(res => {
      this.loading = false;
      this.router.navigate(['/auth/login']);
    }, err => {
      this.loading = false;

      this.error = err.error['hydra:description'];
      this.username.setErrors({ invalid: true });
    }));
  }
}
