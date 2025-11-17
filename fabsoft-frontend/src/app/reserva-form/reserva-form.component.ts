import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-form.html',
  styleUrl: './reserva-form.css'
})
export class ReservaFormComponent {
  reserva = {
    nomePet: '',
    tipoPet: '',
    raca: '',
    idade: '',
    dataEntrada: '',
    dataSaida: '',
    observacoes: ''
  };

  constructor(private router: Router) {}

  cancelar() {
    this.router.navigate(['/']);
  }

  submitReserva() {
    console.log('Dados da reserva:', this.reserva);
    alert('Reserva enviada com sucesso! Entraremos em contato para confirmação.');
    this.router.navigate(['/']);
  }
}