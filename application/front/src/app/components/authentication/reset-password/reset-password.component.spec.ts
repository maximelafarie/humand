import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService } from '@app/api';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordModule } from './reset-password.module';

import { of, throwError } from 'rxjs';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResetPasswordModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ token: 'resetToken' }),
              data: { mode: 'reset' }
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset password', () => {
    const authService = TestBed.inject(AuthenticationService);

    component.form.patchValue({
      password: 'MonsuperMotdepasse79*',
      passwordConfirm: 'MonsuperMotdepasse79*'
    });

    spyOn(authService, 'resetPassword').and.returnValue(of({}));
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.reset();

    expect(authService.resetPassword).toHaveBeenCalledWith('resetToken', 'MonsuperMotdepasse79*');
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should not reset password', () => {
    const authService = TestBed.inject(AuthenticationService);

    component.form.patchValue({
      password: 'MonsuperMotdepasse79*',
      passwordConfirm: 'MonsuperMotdepasse79*'
    });

    spyOn(authService, 'resetPassword').and.returnValue(throwError({ error: { violations: [] } }));

    component.reset();

    expect(authService.resetPassword).toHaveBeenCalledWith('resetToken', 'MonsuperMotdepasse79*');
  });
});
