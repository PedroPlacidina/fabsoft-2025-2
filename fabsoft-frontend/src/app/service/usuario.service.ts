import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = 'http://localhost:8080/api/v1/usuarios'


  constructor(private http:HttpClient){}

  getUsuarios(){
    return this.http.get<Usuario[]>(this.apiUrl)
  }

  saveUsuario(usuario:Usuario){
    if(usuario.id){
      return this.http.put(this.apiUrl + '/' + usuario.id, usuario)
    }
    return this.http.post(this.apiUrl, usuario)
  }

  getUsuarioById(id:string){
    return this.http.get<Usuario>(this.apiUrl + '/' + id)
  }

  
}
