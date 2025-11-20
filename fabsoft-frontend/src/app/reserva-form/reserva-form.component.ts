import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { AuthService } from '../auth-service/auth.service';
import { Usuario } from '../model/usuario';
import { Pet } from '../model/pet';
import { Reserva } from '../model/reserva';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-form.html',
  styleUrl: './reserva-form.css'
})
export class ReservaFormComponent implements OnInit {

  formDados = {
    nomePet: '',
    tipoPet: '',
    raca: '',
    idade: null,
    peso: null, 
    dataEntrada: '',
    dataSaida: '',
    observacoes: ''
  };

  usuarioLogado: Usuario = new Usuario();
  isLoading = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    const user = this.authService.getCurrentUser();
    
    if (user && user.id) {

      this.usuarioService.getUsuarioById(user.id.toString()).subscribe({
        next: (res) => {
          this.usuarioLogado = res;
        },
        error: (err) => {
          console.error('Erro ao buscar usuário', err);
        }
      });
    } else {
      alert('Você precisa estar logado para fazer uma reserva!');
      this.router.navigate(['/login']);
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  submitReserva() {
    if(!this.usuarioLogado.id) return;

    this.isLoading = true;

    const novoPet: Pet = {
      nome: this.formDados.nomePet,
      tipo: this.formDados.tipoPet,
      raca: this.formDados.raca,
      idade: this.formDados.idade || 0,
      peso: this.formDados.peso || 0
    };

 
    const novaReserva: Reserva = {
      dataCheckIn: this.formDados.dataEntrada,
      dataCheckOut: this.formDados.dataSaida,
      status: 'Pendente',
      listaServicos: []
    };


    if (!this.usuarioLogado.pets) this.usuarioLogado.pets = [];
    if (!this.usuarioLogado.reservas) this.usuarioLogado.reservas = [];

    this.usuarioLogado.pets.push(novoPet);
    this.usuarioLogado.reservas.push(novaReserva);

 
    this.usuarioService.saveUsuario(this.usuarioLogado).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert('Reserva realizada com sucesso!');
        this.router.navigate(['/perfil']); 
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao processar reserva.');
        this.isLoading = false;
      }
    });
  }
}