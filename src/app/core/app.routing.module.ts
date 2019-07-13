import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '../login/login.component';
import {ReportesSegmentacionComponent} from '../reportes-segmentacion/reportes-segmentacion.component';
import {CalidadSegmentacionComponent} from '../calidad-segmentacion/calidad-segmentacion.component';
import {UsuariosComponent} from '../usuarios/usuarios.component';
import {UsuariosDetalleComponent} from '../usuarios-detalle/usuarios-detalle.component';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'reportes', component: ReportesSegmentacionComponent, canActivate: [AuthGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/detalle/:id', component: UsuariosDetalleComponent},
  {path: 'usuarios/crear', component: UsuariosDetalleComponent},
  {path: 'calidad', component: CalidadSegmentacionComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
