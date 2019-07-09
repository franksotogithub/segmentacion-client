import {Component, OnInit} from '@angular/core';
import {ReporteService} from "../services/reporte.service";
import {ParametrosService} from "../services/parametros.service";

@Component({
  selector: 'app-esri-map-leyenda',
  templateUrl: './esri-map-leyenda.component.html',
  styleUrls: ['./esri-map-leyenda.component.scss']
})
export class EsriMapLeyendaComponent implements OnInit {

  private datos = {data: [], rangos: [], colores: []};
  private ambito;
  private titulo;

  constructor(private reporteService: ReporteService, private parametrosService: ParametrosService) {
  }

  ngOnInit() {

    this.reporteService.getLoadedDataMapaSource().subscribe(res => {
        this.datos = res;
        this.titulo =`${this.parametrosService.reporte.titulo}  ${this.parametrosService.ambito.titulo}`;

      }
    );

  }

}
