import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormUsuario } from './form-usuario/form-usuario';


export const routes: Routes = [
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'usuarios/novo', component: FormUsuario}
];
