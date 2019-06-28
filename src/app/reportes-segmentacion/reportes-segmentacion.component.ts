import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ReporteService} from '../services/reporte.service';
import {ParametrosService} from '../services/parametros.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReportesSegmentacionDetalleComponent} from '../reportes-segmentacion-detalle/reportes-segmentacion-detalle.component';

@Component({
  selector: 'app-reportes-segmentacion',
  templateUrl: './reportes-segmentacion.component.html',
  styleUrls: ['./reportes-segmentacion.component.scss']
})
export class ReportesSegmentacionComponent implements OnInit {


  //displayedColumns: string[] = ['codigo', 'descripcion', 'cant_zona_marco', 'cant_zona_segm', 'porcent_segm'];

  displayedColumns: any[] = [
    {data: 'codigo', label: 'CODIGO'},
    {data: 'descripcion', label: 'DESCRIPCION'},
    {data: 'cant_zona_marco', label: 'MARCO ZONAS'},
    {data: 'cant_zona_segm', label: 'ZONAS AVANC'},
    {data: 'porcent_segm', label: 'PORCENT. AV.'}
  ];

  columnsToDisplay: string[] = this.displayedColumns.map(x => {
    return x.data
  });
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any[];
  ambito: number = 0;
  itemsUbigeos: any[] = [{'ambito': -1, 'text': 'PERU', codigo: '00'}];


  constructor(private reporteService: ReporteService, private parametrosService: ParametrosService, public dialog: MatDialog) {
    //window.location.reload();
  }


  selectUbigeo(row, event) {
    if (this.ambito < 3) {
      let ambito = this.ambito + 1;
      this.parametrosService.cambiarParametros({ambito: ambito, codigo: row.codigo, text: row.descripcion});
    } else {
      this.openDialog(row);
    }
  }

  selectItemUbigeo(row, event) {
    let ambito = row.ambito;
    this.parametrosService.cambiarParametros({ambito: ambito, codigo: row.codigo, text: row.text});
  }

  openDialog(row): void {
    //getDataReporteCroquisListado


    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });*/

    this.parametrosService.cambiarParametrosCroquisListado({ambito:0,codigo:row.codigo});

    const dialogRef = this.dialog.open(ReportesSegmentacionDetalleComponent, {
      width: '90%',
      data: {idzona:row.codigo}
    });

    /*this.reporteService.getDataReporteCroquisListado(0,row.codigo).subscribe(data=>{
      const dialogRef = this.dialog.open(ReportesSegmentacionDetalleComponent, {
        width: '90%',
      });
    });*/
  }

  ngOnInit() {

    this.reporteService.getLoadedDataSource().subscribe(res => {
        this.ambito = this.parametrosService.params.ambito;
        this.itemsUbigeos = this.parametrosService.getItemsUbigeos();
        this.data = res;
      }
    );


  }


}

/*
@Component({
  selector: 'app-reportes-segmentacion-detalle',
  templateUrl: './reportes-segmentacion-detalle.component.html',
  //styleUrls: ['./reportes-segmentacion-detalle.component.scss']
})
export class ReportesSegmentacionDetalleComponent {

  constructor() { }


}
*/
