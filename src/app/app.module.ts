import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './core/material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './core/app.routing.module';
import { ReportesSegmentacionComponent } from './reportes-segmentacion/reportes-segmentacion.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EsriMapComponent } from './esri-map/esri-map.component';
import {JwtInterceptor } from './helpers/jwt.interceptor';
import {ErrorInterceptor } from './helpers/error.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuComponent } from './menu/menu.component';
import { ReportesSegmentacionDetalleComponent } from './reportes-segmentacion-detalle/reportes-segmentacion-detalle.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosDetalleComponent } from './usuarios-detalle/usuarios-detalle.component';
import { UsuarioDialogBoxComponent } from './usuario-dialog-box/usuario-dialog-box.component';
//import {MatTableDataSource} from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportesSegmentacionComponent,
    EsriMapComponent,
    MenuComponent,
    ReportesSegmentacionDetalleComponent,
    UsuariosComponent,
    UsuariosDetalleComponent,
    UsuarioDialogBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    //MatTableDataSource,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  entryComponents: [ ReportesSegmentacionDetalleComponent,UsuarioDialogBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
