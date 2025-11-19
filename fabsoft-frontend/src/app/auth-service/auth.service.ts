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
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique se o backend está rodando.');
      }
    });
  }

  cadastrar(usuario: Usuario, callback: (success: boolean) => void): void {
    if (!usuario.nome || !usuario.email || !usuario.senha) {
      alert('Preencha todos os campos obrigatórios!');
      callback(false);
      return;
    }

    console.log('📤 Dados sendo enviados para API:', usuario); 

    this.usuarioService.saveUsuario(usuario).subscribe({
      next: (response) => {
        console.log('✅ Resposta da API:', response); 
        alert('Cadastro realizado com sucesso!');
        callback(true);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('❌ Erro completo:', error); 
        console.error('❌ Mensagem de erro:', error.error); 
        
        if (error.status === 400) {
          if (error.error && typeof error.error === 'string') {
            alert(`Erro de validação: ${error.error}`);
          } else if (error.error && error.error.message) {
            alert(`Erro: ${error.error.message}`);
          } else {
            alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
          }
        } else if (error.status === 0) {
          alert('Erro de conexão. Verifique se o backend está rodando.');
        } else {
          alert('Erro ao cadastrar. Tente novamente.');
        }
        callback(false);
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