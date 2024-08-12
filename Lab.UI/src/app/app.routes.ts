import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuario/formUsuarios/usuarios.component';
import { LoginUsuariosComponent } from './pages/auth/login-usuarios/login-usuarios.component';
import { ListUsuariosComponent } from './pages/usuario/ListUsuarios/list-usuarios.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RecuperarContrasennaComponent } from './pages/auth/recuperar-contrasenna/recuperar-contrasenna.component';
import { ValidarCorreoComponent } from './pages/auth/validar-correo/validar-correo.component';
import { ValidarCodigoComponent } from './pages/auth/validar-codigo/validar-codigo.component';
import { CambiarContrasennaComponent } from './pages/auth/cambiar-contrasenna/cambiar-contrasenna.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginUsuariosComponent },
  {
    path: 'cambiar-contrasenna',
    component: RecuperarContrasennaComponent,
    children: [
      { path: '', redirectTo: 'validarcorreo', pathMatch: 'full' }, // Redirige al primer paso
      { path: 'validarcorreo', component: ValidarCorreoComponent }, // Primer paso
      { path: 'validarcodigo', component: ValidarCodigoComponent }, // Segundo paso
      { path: 'cambiarcontrasenna', component: CambiarContrasennaComponent }, // Tercer paso
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protege todas las rutas hijas
    canActivateChild: [AuthGuard], // Protege las rutas hijas del módulo
    children: [
      { path: 'usuarios', component: ListUsuariosComponent },
      { path: 'usuarios/:guid', component: UsuariosComponent },
    ],
  },
  { path: '**', redirectTo: 'login' }, // Ruta de fallback en caso de ruta no encontrada
];
