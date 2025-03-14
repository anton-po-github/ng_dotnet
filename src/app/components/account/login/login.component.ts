import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  returnUrl: string;

  constructor(private accountService: AccountService, private router: Router, 
    private activatedRoute: ActivatedRoute) {
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop'
  }

  public goToRegister(): void {
    this.router.navigate(["auth/register"])
  }

 public onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (result) => {
        this.router.navigate(["users"])
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
       // this.showLoader = false;
      }
    })
  }
}
