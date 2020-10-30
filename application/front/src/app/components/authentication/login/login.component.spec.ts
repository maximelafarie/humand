import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { AuthenticationService } from '@app/api';
import { TokenStorageService } from '@app/services';
import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';

import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return username', () => {
    component.form.get('username').patchValue('test@humand.fr');
    expect(component.username.value).toBe('test@humand.fr');
  });

  it('should return password', () => {
    component.form.get('password').patchValue('test');
    expect(component.password.value).toBe('test');
  });

  it('should login', () => {
    const authService = TestBed.inject(AuthenticationService);
    const tokenService = TestBed.inject(TokenStorageService);

    component.form.get('username').patchValue('test@humand.fr');
    component.form.get('password').patchValue('test');

    spyOn(authService, 'login').and.returnValue(of({ token: 'token' }));
    spyOn(tokenService, 'setAuthToken').and.callThrough();

    component.login();

    expect(authService.login).toHaveBeenCalledWith({ username: 'test@humand.fr', password: 'test' });
    expect(tokenService.setAuthToken).toHaveBeenCalledWith('token');
  });
});
