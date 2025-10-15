import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuario',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
  providers: [UsuarioService]
})
export class UsuarioComponent {
  listaUsuario: Usuario[]=[]

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(){
    console.log('Pinto enorme.......')
    this.usuarioService.getUsuarios().subscribe( usuario =>{
        this.listaUsuario = usuario
    })
  }


}
