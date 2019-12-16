import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ReporteService} from '../services/reporte.service';
import {ParametrosService} from '../services/parametros.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReportesSegmentacionDetalleComponent} from '../reportes-segmentacion-detalle/reportes-segmentacion-detalle.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ReporteDialogBoxComponent } from "../reporte-dialog-box/reporte-dialog-box.component";

//import {} from '@angular/material';
@Component({
  selector: 'app-reportes-segmentacion',
  templateUrl: './reportes-segmentacion.component.html',
  styleUrls: ['./reportes-segmentacion.component.scss']
})
export class ReportesSegmentacionComponent implements OnInit {
  displayedColumns: any[] = [
    {data: 'codigo', label: 'CODIGO'},
    {data: 'descripcion', label: 'DESCRIPCION'},
    {data: 'cant_zona_marco', label: 'MARCO ZONAS'},
    {data: 'cant_zona_segm', label: 'ZONAS AVANC'},
    {data: 'porcent_segm', label: 'PORCENT. AV.'}
  ];

  columnsToDisplay: string[] = this.displayedColumns.map(x => {
    return x.data;
  });

  dataSource = new MatTableDataSource([]);
  ambito: number = 0;
  itemsUbigeos: any[] = [{'ambito': -1, 'text': 'PERU', codigo: '00'}];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private reporteService: ReporteService, private parametrosService: ParametrosService, public dialog: MatDialog) {
  }

  applyFilter(event) {
    let filterValue=event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectUbigeo(row, event) {
    if (this.ambito < 3) {
      let ambito = this.ambito + 1;
      this.parametrosService.cambiarParametros({ambito: ambito, codigo: row.codigo, text: row.descripcion});
    } else {

      if (row.cant_zona_segm>0){
        this.openDialog(row);  
      }
      else {
        this.openDialogFaild(row);
      }
    }
  }

  selectItemUbigeo(row, event) {
    let ambito = row.ambito;
    this.parametrosService.cambiarParametros({ambito: ambito, codigo: row.codigo, text: row.text});
  }

  openDialog(row): void {

    this.parametrosService.cambiarParametrosCroquisListado({ambito: 0, codigo: row.codigo});

    const dialogRef = this.dialog.open(ReportesSegmentacionDetalleComponent, {
      width: '90%',
      data: {idzona: row.codigo}
    });
    
  }

  openDialogFaild(row): void {

    
    const dialogRef = this.dialog.open(ReporteDialogBoxComponent, {
      width: '20%',
      data: {zona: row.descripcion}
    });
    
  }



  ngOnInit() {

    this.reporteService.getLoadedDataSource().subscribe(res => {
        this.ambito = this.parametrosService.params.ambito;
        this.itemsUbigeos = this.parametrosService.getItemsUbigeos();
        
        this.dataSource.data = res.reporte;
        this.dataSource.sort = this.sort;
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
