import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ReporteService} from '../services/reporte.service';
import {ParametrosService} from '../services/parametros.service';

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

  constructor(private reporteService: ReporteService , private parametrosService: ParametrosService  ) {

  }

  selectUbigeo(row,event) {
    let ambito=this.ambito+1;
    this.parametrosService.cambiarParametros({ambito: ambito ,codigo: row.codigo});
  }

  ngOnInit() {
    this.reporteService.getLoadedDataSource().subscribe(res => {
        this.ambito=this.parametrosService.params.ambito;
        this.data = res;
      }
    );


  }


}
