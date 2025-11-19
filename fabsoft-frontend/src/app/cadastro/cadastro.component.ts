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


  onTelefoneInput(event: any) {

    let value = event.target.value.replace(/\D/g, '');
    

    if (value.length > 11) {
      value = value.substring(0, 11);
    }


    if (value.length > 10) {

      value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 5) {

      value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,5}).*/, '($1) $2');
    }


    this.usuario.telefone = value;
    event.target.value = value;
  }
}