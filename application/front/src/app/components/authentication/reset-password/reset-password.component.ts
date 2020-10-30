import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '@app/api';
import { passwordMatchValidator } from '@app/validators';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public loading = false;
  public passwordReveal = {
    first: false,
    second: false
  };
  public errors = [];
  public tokenError = '';

  private token: string;
  private routeType: string;
  private subs: Subscription = new Subscription();

  public get initialPassword() {
    return this.form.get('password');
  }

  public get confirmPassword() {
    return this.form.get('passwordConfirm');
  }

  public get createOrReset() {
    return this.routeType === 'reset' ? 'reset' : 'create';
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.prepareToReset();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private prepareToReset(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.routeType = this.route.snapshot.data.mode;
  }

  private initForm(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    }, { updateOn: 'change', validators: passwordMatchValidator() });
  }

  public reset(): void {
    this.loading = true;

    this.subs.add(this.authService.resetPassword(this.token, this.initialPassword.value).subscribe(res => {
      this.loading = false;
      this.router.navigate(['/auth/login']);
    }, err => {
      this.loading = false;
      if (err.error.violations) {
        this.errors = err.error.violations;
      } else {
        this.tokenError = err.error['hydra:description'];
      }
    }));
  }

}
