import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { PrincipalComponent } from './principal/principal.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotten-password',
    component: ForgottenPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'usuarios',
    component: ListadoUsuarioComponent
  },
  {
    path: '',
    component: PrincipalComponent
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  },
  {
    path: 'reserva',
    component:  ReservaComponent
  },
  {
    path: 'lista-reservas/:fecha',
    component: ListaReservasComponent
  }
];
