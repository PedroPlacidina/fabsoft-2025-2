import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormUsuario } from './form-usuario/form-usuario';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReservaFormComponent } from './reserva-form/reserva-form.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'reserva', component: ReservaFormComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'usuarios/novo', component: FormUsuario },
  { path: 'usuarios/alterar/:id', component: FormUsuario },
  { path: '**', redirectTo: '' }
];