import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {ReporteService} from "../services/reporte.service";
import {ParametrosService} from "../services/parametros.service";

@Component({
  selector: 'app-estadisticas-segmentacion',
  templateUrl: './estadisticas-segmentacion.component.html',
  styleUrls: ['./estadisticas-segmentacion.component.scss']
})
export class EstadisticasSegmentacionComponent implements OnInit {
  dataSource1 = [];
  dataSource2 = [];
  dataSource3 =[];

  displayedColumns1: any[] = [
    {data: 'label', label: 'NUMERO DE VIVIENDAS POR AREA DE EMPADRONAMIENTO'},
    {data: 'valor', label: 'ABS'},
    {data: 'porcent', label: '%'},

  ];


  columnsToDisplay1: string[] = this.displayedColumns1.map(x => {
    return x.data;
  });

  displayedColumns2: any[] = [
    {data: 'label', label: 'Promedio de Manzanas, viviendas y personas por area de empadronamiento'},
    {data: 'valor', label: 'Abs.'},

  ];

  columnsToDisplay2: string[] = this.displayedColumns1.map(x => {
    return x.data;
  });


  constructor(private reporteService: ReporteService, private parametrosService: ParametrosService) {
  }

  ngOnInit() {
    this.reporteService.getLoadedDataSource().subscribe(res => {
        this.dataSource1 = res.estadisticas.viviendas;
        this.dataSource2 = res.estadisticas.promedios;
        this.dataSource3 = res.estadisticas.informativa;

      }
    );

  }

}
