import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ReporteService} from '../services/reporte.service';

@Component({
  selector: 'app-reportes-segmentacion',
  templateUrl: './reportes-segmentacion.component.html',
  styleUrls: ['./reportes-segmentacion.component.css']
})
export class ReportesSegmentacionComponent implements OnInit {


  displayedColumns: string[] = ['codigo', 'descripcion', 'cant_zona_marco', 'cant_zona_segm', 'porcent_segm'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any[];
  ambito: number = 0;

  constructor(private reporteService: ReporteService) {

  }

  selectUbigeo(row,event) {
    //console.log('row>>', row);

  }

  ngOnInit() {
    this.reporteService.getLoadedDataSource().subscribe(res => {
        console.log('getLoadedDataMapaSource res', res);
        this.ambito = res['ambito'];
        this.data = res;

      }
    );


  }


}
