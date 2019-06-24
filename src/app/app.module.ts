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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportesSegmentacionComponent,
    EsriMapComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
