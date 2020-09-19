import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

// NgRX
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { ThemeService } from '../../themes/theme.service';
import * as themeActions from '../../store/actions/theme.actions';
import { User } from '../../models/user.model';
import { LoginService } from './login.service';
import { ApolloError } from '@apollo/client/core';
import { GraphQLError } from 'graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  darkMode: boolean = false;
  loginMode: boolean = true;

  isWeb: boolean = false;
  private unsubscribe$ = new Subject<void>();
  loginForm: FormGroup;
  hidePass: boolean;

  user: User;
  errorMessage: string;

  constructor(
    private breakepointObserve: BreakpointObserver,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private themeService: ThemeService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.hidePass = false;

    this.themeService.theme
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ darkMode }) => {
        this.darkMode = darkMode;
      });

    this.breakepointObserve
      .observe(Breakpoints.Web)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.isWeb = result.matches;

        if (!result.matches) setTimeout(() => this.initAnimation(), 200);
      });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeTheme(): void {
    this.darkMode
      ? this.store.dispatch(themeActions.turnOffDarkMode())
      : this.store.dispatch(themeActions.turnOnDarkMode());
  }

  submitForm(): void {
    this.user = this.loginForm.value as User;

    if (this.loginMode) {
      if (
        this.loginForm.controls['email'].invalid ||
        this.loginForm.controls['password'].invalid
      )
        return;
      this.user.username = undefined;
      this.logIn(this.user);
    } else {
      if (this.loginForm.invalid) return;
      this.signUp(this.user);
    }
  }

  logIn(user: User): void {
    this.loginService
      .logIn(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ({ data }: any) => {
          if (data) {
            localStorage.setItem('token', data.logIn);
            this.router.navigate['/home'];
          }
        },
        (err: ApolloError) => this.handleErrors(err.graphQLErrors[0])
      );
  }

  signUp(user: User): void {
    this.loginService
      .createUser(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ({ data }) => {
          if (data) {
            this.loginForm.reset();

            this.isWeb ? this.slideAnimation() : this.mobileAnimation();
          }
        },
        (err: ApolloError) => this.handleErrors(err.graphQLErrors[0])
      );
  }

  handleErrors(gqlError: GraphQLError): void {
    console.log(gqlError);

    if (gqlError.extensions.code === 'incorrect') {
      this.loginForm.controls['email'].setErrors({ server: true });
      this.loginForm.controls['password'].setErrors({ server: true });
    } else {
      this.loginForm.controls[gqlError.extensions.code].setErrors({
        server: true,
      });
    }

    this.errorMessage = gqlError.message;
  }

  slideAnimation(): void {
    const infoElement: Element = document.querySelector('.info');
    const boxElement: Element = document.querySelector('.login-box');

    if (this.loginMode) {
      infoElement.classList.add('slide-info');

      boxElement.classList.add('box-signup');
      infoElement.classList.add('info-signup');

      infoElement.addEventListener('animationend', () => {
        infoElement.classList.remove('slide-info');
      });

      setTimeout(() => {
        this.loginMode = !this.loginMode;
        this.loginForm.reset();
        console.log(this.loginForm.value);
      }, 400);
    } else {
      infoElement.classList.add('slide-info');

      boxElement.classList.remove('box-signup');
      infoElement.classList.remove('info-signup');

      infoElement.addEventListener('animationend', () => {
        infoElement.classList.remove('slide-info');
      });

      setTimeout(() => {
        this.loginMode = !this.loginMode;
        this.loginForm.reset();
      }, 500);
    }
  }

  mobileAnimation(): void {
    const usernameField: Element = document.querySelector('#username-field');
    let forgotLink: Element = document.querySelector('.forgot');
    const fieldsContainer: Element = document.querySelector('.fields');

    const signupButton: Element = document.querySelector('#m-button-signup');
    const loginButton: Element = document.querySelector('#m-button-login');

    if (this.loginMode) {
      signupButton.classList.remove('gradient-text-button');
      signupButton.classList.add('gradient-button');

      loginButton.classList.remove('gradient-button');
      loginButton.classList.add('gradient-text-button');

      forgotLink.classList.add('slide-out');
      fieldsContainer.classList.add('slide-down');

      forgotLink.addEventListener('animationend', () => {
        forgotLink.classList.remove('slide-out');
      });
      fieldsContainer.addEventListener('animationend', () => {
        fieldsContainer.classList.remove('slide-down');
      });

      this.fadeAnimation();

      setTimeout(() => {
        this.loginMode = !this.loginMode;
        this.loginForm.reset();
      }, 1000);
    } else {
      loginButton.classList.remove('gradient-text-button');
      loginButton.classList.add('gradient-button');

      signupButton.classList.remove('gradient-button');
      signupButton.classList.add('gradient-text-button');

      usernameField.classList.add('slide-out');
      fieldsContainer.classList.add('slide-up');

      usernameField.addEventListener('aniamtionend', () => {
        usernameField.classList.remove('slide-in');
      });
      fieldsContainer.addEventListener('animationend', () => {
        fieldsContainer.classList.remove('slide-up');
      });

      this.fadeAnimation();

      setTimeout(() => {
        this.loginMode = !this.loginMode;
      }, 1000);

      setTimeout(() => {
        forgotLink = document.querySelector('.forgot');
        forgotLink.classList.add('slide-in');
        forgotLink.addEventListener('animationend', () => {
          forgotLink.classList.remove('slide-in');
        });

        this.loginForm.reset();
      }, 1010);
    }
  }

  fadeAnimation(): void {
    const legendElement: Element = document.querySelector('#legend-form');
    const spanElement: Element = document.querySelector('#span-mode');

    legendElement.classList.remove('fade-in');
    legendElement.classList.add('fade-out');

    spanElement.classList.add('fade-out');

    legendElement.addEventListener('animationend', () => {
      legendElement.classList.remove('fade-out');
      legendElement.classList.add('fade-in');
    });

    spanElement.addEventListener('animationend', () => {
      spanElement.classList.remove('fade-out');
      spanElement.classList.add('fade-in');
    });
  }

  initAnimation(): void {
    console.log('Animation!!');
    const passwordField: Element = document.querySelector('#password-field');
    const forgotLink: Element = document.querySelector('.forgot');

    passwordField.classList.add('slide-in');
    passwordField.addEventListener('animationend', () => {
      passwordField.classList.remove('slide-in');
    });

    setTimeout(() => {
      forgotLink.classList.add('slide-in');
      forgotLink.addEventListener('animationend', () => {
        forgotLink.classList.remove('slide-in');
      });
    }, 200);
  }
}
