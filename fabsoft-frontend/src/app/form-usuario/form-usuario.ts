import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-form-usuario',
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './form-usuario.html',
  styleUrl: './form-usuario.css',
  providers: [UsuarioService, Router]
})
export class FormUsuario {
  usuario: Usuario = new Usuario();


  constructor(
    private usuarioService:UsuarioService,
    private router:Router
  ){}

  salvar(){
    this.usuarioService.saveUsuario(this.usuario)
      .subscribe(resultado => {
        this.router.navigate(['usuarios'])
      })
  }

}
