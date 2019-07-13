import {Component, OnInit, ViewChild} from '@angular/core';
import {CalidadService} from '../services/calidad.service'
//import {ReportesSegmentacionDetalleComponent} from "../reportes-segmentacion-detalle/reportes-segmentacion-detalle.component";
import {CalidadSegmentacionDetalleComponent} from "../calidad-segmentacion-detalle/calidad-segmentacion-detalle.component";
import {ParametrosService} from "../services/parametros.service";
import {MatDialog, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-calidad-segmentacion',
  templateUrl: './calidad-segmentacion.component.html',
  styleUrls: ['./calidad-segmentacion.component.scss']
})
export class CalidadSegmentacionComponent implements OnInit {
  columnsToDisplay = [];
  displayedColumns = [];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private calidadService: CalidadService, public dialog: MatDialog) {
  }

  selectUbigeo(row, event) {
    if (this.calidadService.ambito < 3) {
      this.calidadService.ambito = this.calidadService.ambito + 1;
      this.calidadService.getDataAvanceCalidad({ambito: this.calidadService.ambito, codigo: row.codigo}).subscribe(res=>{});

    } else {
      this.openDialog(row);
    }
  }

  openDialog(row): void {

    this.calidadService.getDataAeuMuestraCalidad(row.codigo);

    const dialogRef = this.dialog.open(CalidadSegmentacionDetalleComponent, {
      width: '90%',
      data: {idzona: row.codigo}
    });

  }

  ngOnInit() {

    0
    this.calidadService.getDataAvanceCalidad({ambito: this.calidadService.ambito, codigo: '00'}).subscribe(res=>{});

    this.calidadService.loadedDataAvanceCalidad$.subscribe(res => {


        if(res.data){
          if (res.data.length>0){
            this.dataSource= res.data;
            this.columnsToDisplay = res.columnsToDisplay;
            this.displayedColumns = res.displayedColumns;

          }
        }

      }
    );

  }

}
