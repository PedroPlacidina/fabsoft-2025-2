import { Component, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-usuario',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
  providers: [UsuarioService, Router]
})
export class UsuarioComponent {
  listaUsuario: Usuario[]=[]

  @ViewChild('myModal') modalElement!: ElementRef;
  private modal!: bootstrap.Modal;

  private usuarioSelecionado!: Usuario;

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

  alterar(umUsuario:Usuario){
    this.router.navigate(['usuarios/alterar', umUsuario.id]);
  }

  abrirComfirmacao(usuario: Usuario){
    this.usuarioSelecionado = usuario;
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modal.show();
  }

  fecharConfirmacao(){
    this.modal.hide();
  }

  confirmarExclusao(){
    this.usuarioService.excluirUsuario(this.usuarioSelecionado.id.toString())
      .subscribe(
        () => {
          this.fecharConfirmacao()
          this.usuarioService.getUsuarios()
            .subscribe(
              usuarios => {
                this.listaUsuario = usuarios
              }
            )
      },
      error => {
        console.error('Erro ao excluir usuário:', error)
      }
    )
  }


}
