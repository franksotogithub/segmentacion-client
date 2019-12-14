import {Component, OnInit, ViewChild} from '@angular/core';

import {MatDialog, MatSort, MatTableDataSource} from "@angular/material";
import {MatPaginator} from '@angular/material/paginator';
import { ReportesCalidadService } from '../services/reportes-calidad.service';

@Component({
  selector: 'app-reportes-calidad',
  templateUrl: './reportes-calidad.component.html',
  styleUrls: ['./reportes-calidad.component.scss']
})
export class ReportesCalidadComponent implements OnInit {
  columnsToDisplay = [];
  displayedColumns = [];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  itemsUbigeos=[];
  constructor(private reporteCalidadService: ReportesCalidadService , public dialog: MatDialog) { }
  
  selectUbigeo(row, event) {
    
    if(this.reporteCalidadService.ambito<3){
      this.reporteCalidadService.ambito = this.reporteCalidadService.ambito + 1;
      this.reporteCalidadService.codigo=  row.codigo;
      this.reporteCalidadService.itemsUbigeos.push({'ambito': this.reporteCalidadService.ambito, 'codigo': row.codigo, 'text': row.descripcion});
      this.itemsUbigeos=this.reporteCalidadService.itemsUbigeos;
      this.reporteCalidadService.reporteIndicadores({ambito: this.reporteCalidadService.ambito, codigo: this.reporteCalidadService.codigo}).subscribe(res=>{});

    }
    

  }

  selectItemUbigeo(row, event) {
    
    let ambito = row.ambito;
    
    
    this.reporteCalidadService.codigo=  row.codigo;
    this.reporteCalidadService.ambito = row.ambito;
    this.reporteCalidadService.itemsUbigeos = this.reporteCalidadService.itemsUbigeos.filter(x => x.ambito <=  this.reporteCalidadService.ambito);
    this.reporteCalidadService.reporteIndicadores({ambito: this.reporteCalidadService.ambito, codigo: this.reporteCalidadService.codigo}).subscribe(res=>{});
   
  }
  ngOnInit() {

    this.itemsUbigeos=this.reporteCalidadService.itemsUbigeos;
    
    this.reporteCalidadService.reporteIndicadores({ambito: this.reporteCalidadService.ambito, codigo: this.reporteCalidadService.codigo}).subscribe(res=>{});

    this.reporteCalidadService.loadedDataReporteIndicadores$.subscribe(res => {
      console.log('res>>>',res);
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


  
}
