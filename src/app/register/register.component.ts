import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;
  userForm: FormGroup;
  passwordForm: FormGroup;
  registrationFailed = false;


  static passwordMatch(group: FormGroup): { matchingError: true } | null {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }
  constructor(fb: FormBuilder, private userService: UserService, private readonly router: Router) {
      this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
      this.passwordCtrl = fb.control('', Validators.required);
      this.confirmPasswordCtrl = fb.control('', Validators.required);
      this.birthYearCtrl = fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);

      this.passwordForm = fb.group(
      { password: this.passwordCtrl, confirmPassword: this.confirmPasswordCtrl },
      { validators: RegisterComponent.passwordMatch }
    );

      this.userForm  = fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });

  }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.register(this.userForm.value.login,
      this.userForm.value.passwordForm.password,
      this.userForm.value.birthYear).pipe(
      tap(() => this.router.navigate(['/'])),
      catchError(({error}) => {
        this.registrationFailed = true;
        console.log(error);
        return of();
      })
    ).subscribe();
  }
}
