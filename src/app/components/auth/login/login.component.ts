import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, ILoginForm } from '../auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router
  ) {
    if (router.url === '/auth/login' && this.authService.accessToken) {
      this.router.navigate(['']);
    }
  }

  public goToRegister(): void {
    this.router.navigate(['auth/register']);
  }

  public onSubmit() {
    this.authService.login(this.loginForm.value as ILoginForm).subscribe({
      next: (result) => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        // this.showLoader = false;
      }
    });
  }
}
