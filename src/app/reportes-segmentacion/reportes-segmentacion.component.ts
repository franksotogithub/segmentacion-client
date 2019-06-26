import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ReporteService} from '../services/reporte.service';
import {ParametrosService} from '../services/parametros.service';

@Component({
  selector: 'app-reportes-segmentacion',
  templateUrl: './reportes-segmentacion.component.html',
  styleUrls: ['./reportes-segmentacion.component.scss']
})
export class ReportesSegmentacionComponent implements OnInit {


  //displayedColumns: string[] = ['codigo', 'descripcion', 'cant_zona_marco', 'cant_zona_segm', 'porcent_segm'];

  displayedColumns: any[] = [
    {data:'codigo',label:'CODIGO'},
    {data:'descripcion',label:'DESCRIPCION'},
    {data:'cant_zona_marco',label:'MARCO ZONAS'},
    {data:'cant_zona_segm',label:'ZONAS AVANC'},
    {data:'porcent_segm',label:'PORCENT. AV.'}
    ];

  columnsToDisplay: string[] = this.displayedColumns.map(x=>{return x.data});
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any[];
  ambito: number = 0;
  itemsUbigeos: any[]=[{'ambito':-1 ,'text':'PERU',codigo:'00'}];



  constructor(private reporteService: ReporteService , private parametrosService: ParametrosService  ) {
    //window.location.reload();
  }


  selectUbigeo(row,event) {
    let ambito=this.ambito+1;
    this.parametrosService.cambiarParametros({ambito: ambito ,codigo: row.codigo ,text:row.descripcion});
  }

  selectItemUbigeo(row,event) {
    let ambito=row.ambito;
    this.parametrosService.cambiarParametros({ambito: ambito ,codigo: row.codigo ,text:row.text});
  }

  ngOnInit() {

    this.reporteService.getLoadedDataSource().subscribe(res => {
        this.ambito=this.parametrosService.params.ambito;
        this.itemsUbigeos= this.parametrosService.getItemsUbigeos();

        this.data = res;
      }
    );


  }


}
