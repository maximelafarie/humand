import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordModule } from './forgot-password.module';
import { AuthenticationService } from '@app/api';

import { of, throwError } from 'rxjs';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForgotPasswordModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    router = TestBed.inject(Router);
    const ngZone = TestBed.inject(NgZone);
    component = fixture.componentInstance;

    window.history.pushState({ username: 'test@humand.fr' }, 'username');

    fixture.detectChanges();

    ngZone.run(() => {
      router.initialNavigation();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forgot', () => {
    const authService = TestBed.inject(AuthenticationService);

    spyOn(authService, 'forgotPassword').and.returnValue(of(true));
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.forgot();

    expect(authService.forgotPassword).toHaveBeenCalledWith('test@humand.fr');
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should not forgot', () => {
    const authService = TestBed.inject(AuthenticationService);

    spyOn(authService, 'forgotPassword').and.returnValue(throwError({ error: { 'hydra:description': '' } }));

    component.forgot();

    expect(authService.forgotPassword).toHaveBeenCalledWith('test@humand.fr');
  });
});
