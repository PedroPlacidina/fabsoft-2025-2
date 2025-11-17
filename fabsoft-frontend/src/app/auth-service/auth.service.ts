import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.isAuthenticated.next(true);
      this.currentUser.next(JSON.parse(user));
    }
  }

  login(email: string, senha: string): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        const user = usuarios.find((u: Usuario) => u.email === email && u.senha === senha);
        
        if (user) {
          this.isAuthenticated.next(true);
          this.currentUser.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/reserva']);
        } else {
          alert('Email ou senha incorretos!');
        }
      },
      error: (error) => {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao fazer login. Tente novamente.');
      }
    });
  }

  cadastrar(usuario: Usuario): void {
    // Para cadastro, vamos usar uma abordagem mais simples
    // já que o backend vai validar o email único
    this.usuarioService.saveUsuario(usuario).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        if (error.status === 400) {
          alert('Este email já está cadastrado!');
        } else {
          alert('Erro ao cadastrar. Tente novamente.');
        }
      }
    });
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getCurrentUser(): Usuario | null {
    return this.currentUser.value;
  }

  getAuthStatus() {
    return this.isAuthenticated.asObservable();
  }
}