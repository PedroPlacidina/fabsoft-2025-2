import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {
  usuario: Usuario = new Usuario();
  confirmarSenha: string = '';
  
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cadastrar() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Validações
    if (this.usuario.senha !== this.confirmarSenha) {
      this.errorMessage = 'As senhas não coincidem!';
      this.isLoading = false;
      return;
    }

    if (!this.usuario.nome || !this.usuario.email || !this.usuario.senha) {
      this.errorMessage = 'Preencha todos os campos obrigatórios!';
      this.isLoading = false;
      return;
    }

    this.authService.cadastrar(this.usuario, (success: boolean) => {
      this.isLoading = false;
      if (success) {
        this.successMessage = 'Cadastro realizado com sucesso!';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}