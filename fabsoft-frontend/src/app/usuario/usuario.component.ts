import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
  providers: [UsuarioService, Router]
})
export class UsuarioComponent {
  listaUsuario: Usuario[]=[]

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
    
    ){}

  ngOnInit(){
    console.log('Rodou .......')
    this.usuarioService.getUsuarios().subscribe( usuario =>{
        this.listaUsuario = usuario
    })
  }

  novo(){
    this.router.navigate(['usuarios/novo'])
  }


}
