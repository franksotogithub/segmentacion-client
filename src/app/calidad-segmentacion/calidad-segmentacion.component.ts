import {Component, OnInit, ViewChild} from '@angular/core';
import {CalidadService} from '../services/calidad.service'
import {CalidadSegmentacionDetalleComponent} from "../calidad-segmentacion-detalle/calidad-segmentacion-detalle.component";
import {MatDialog, MatSort, MatTableDataSource} from "@angular/material";
import {MatPaginator} from '@angular/material/paginator';
import { ReporteDialogBoxComponent } from "../reporte-dialog-box/reporte-dialog-box.component";
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  itemsUbigeos=[];

  constructor(private calidadService: CalidadService, public dialog: MatDialog ,) {
  }

  selectUbigeo(row, event) {
    if (this.calidadService.ambito < 3) {
      this.calidadService.ambito = this.calidadService.ambito + 1;
      this.calidadService.codigo=  row.codigo;
      this.calidadService.itemsUbigeos.push({'ambito': this.calidadService.ambito, 'codigo': row.codigo, 'text': row.descripcion});
      this.itemsUbigeos=this.calidadService.itemsUbigeos;

      this.calidadService.getDataAvanceCalidad({ambito: this.calidadService.ambito, codigo: this.calidadService.codigo}).subscribe(res=>{});

    } else {

      if(row.estado>-1){
        this.openDialog(row);
      }
      else{
        this.openDialogFaild(row);
      }
      
    }
  }

  selectItemUbigeo(row, event) {
    let ambito = row.ambito;
    this.calidadService.codigo=  row.codigo;
    this.calidadService.ambito = row.ambito;
    this.calidadService.itemsUbigeos = this.calidadService.itemsUbigeos.filter(x => x.ambito <=  this.calidadService.ambito);
    this.calidadService.getDataAvanceCalidad({ambito: this.calidadService.ambito, codigo: this.calidadService.codigo}).subscribe(res=>{});
   
  }

  openDialog(row): void {

    /*this.calidadService.getDataAeuMuestraCalidad(row.codigo);*/

    let dialogRef = this.dialog.open(CalidadSegmentacionDetalleComponent, {
      width: '90%',
      data: {idzona: row.codigo}
    });

    dialogRef.afterClosed().subscribe(
      (data) =>{
        this.calidadService.getDataAvanceCalidad({ambito: this.calidadService.ambito, codigo: row.codigo.substring(0,6) }).subscribe(res=>{});
        dialogRef=null;
      } 
    );

  }
  openDialogFaild(row): void {

    
    const dialogRef = this.dialog.open(ReporteDialogBoxComponent, {
      width: '20%',
      data: {zona: row.zona}
    });
    
  }

  applyFilter(event) {
    let filterValue=event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.itemsUbigeos=this.calidadService.itemsUbigeos;
    
    this.calidadService.getDataAvanceCalidad({ambito: this.calidadService.ambito, codigo: this.calidadService.codigo}).subscribe(res=>{});

    this.calidadService.loadedDataAvanceCalidad$.subscribe(res => {

        if(res.data){
          if (res.data.length>0){
            this.dataSource.data= res.data;
            this.columnsToDisplay = res.columnsToDisplay;
            this.displayedColumns = res.displayedColumns;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
        }

      }
    );

  }

  ngOnDestroy(){
    console.log('dialogo destruido');
  }

}
