import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPageComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any = null;

  reservaRapida = {
    nomePet: '',
    tipoPet: '',
    dataEntrada: '',
    dataSaida: '',
    observacoes: ''
  };

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status;
      this.currentUser = this.authService.getCurrentUser();
    });
  }

  fazerReserva() {
    if (this.isLoggedIn) {
      this.router.navigate(['/reserva']);
    } else {
      this.router.navigate(['/login']);
    }
  }


  fazerReservaRapida() {
    console.log('Reserva rápida:', this.reservaRapida);
    alert('Reserva enviada com sucesso! Entraremos em contato para confirmação.');
    

    this.reservaRapida = {
      nomePet: '',
      tipoPet: '',
      dataEntrada: '',
      dataSaida: '',
      observacoes: ''
    };
  }

  logout() {
    this.authService.logout();
  }
}