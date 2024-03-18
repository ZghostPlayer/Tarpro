import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [AuthService] 
})
export class HomeComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/welcome']);
    }
  }
  
  onRegister(): void {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso', response);
        this.authService.login(this.username, this.password).subscribe({
          next: (loginResponse) => {
            console.log('Login realizado com sucesso', loginResponse);
            console.log('Token stored:', localStorage.getItem('auth_token'));
            this.router.navigate(['/welcome']);
          },
          error: (loginError) => {
            console.error('Erro ao realizar login', loginError);
          }
        });
      },
      error: (error) => {
        console.error('Erro ao registrar', error);
      }
    });
  }



}

