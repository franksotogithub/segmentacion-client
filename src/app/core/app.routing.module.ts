import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '../login/login.component';
import {ReportesSegmentacionComponent} from '../reportes-segmentacion/reportes-segmentacion.component';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'reportes', component: ReportesSegmentacionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
