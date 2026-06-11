import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <section class="login-page container">
    <div class="card p-4 mt-5 mx-auto" style="max-width:420px">
      <h3 class="mb-3">Sign in</h3>
      <form (ngSubmit)="submit()" #f="ngForm">
        <div class="mb-3">
          <input name="email" [(ngModel)]="email" required placeholder="Email" class="form-control" />
        </div>
        <div class="mb-3">
          <input type="password" name="password" [(ngModel)]="password" required placeholder="Password" class="form-control" />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" name="remember" [(ngModel)]="remember" class="form-check-input" id="remember" />
          <label class="form-check-label" for="remember">Remember me</label>
        </div>
        <button class="btn btn-primary w-100" [disabled]="loading">Sign in</button>
      </form>
    </div>
  </section>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  email = '';
  password = '';
  remember = false;
  loading = false;

  async submit() {
    this.loading = true;
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/');
    } catch (err) {
      console.error(err);
      this.loading = false;
      alert('Login failed');
    }
  }
}
