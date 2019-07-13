import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReportesSegmentacionComponent} from '../reportes-segmentacion/reportes-segmentacion.component'
import {ReporteService} from "../services/reporte.service";
import {ParametrosService} from "../services/parametros.service";
import {environment} from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-reportes-segmentacion-detalle',
  templateUrl: './reportes-segmentacion-detalle.component.html',
  styleUrls: ['./reportes-segmentacion-detalle.component.scss']
})

export class ReportesSegmentacionDetalleComponent implements OnInit {
  private columnsToDisplay = [];
  private displayedColumns = [];
  private apiEndPointPdf2 = environment.apiEndPointPdf2;
  private urlPdf = this.apiEndPointPdf2;
  private urlCroquis;
  private itemsAmbitos = [
    {value: 0, label: 'zona-subzona'},
    {value: 1, label: 'seccion'},
    {value: 2, label: 'empadronador'},
  ];


  private data;
  private idzona;

  selectedAmbito(event: any) {

    let ambito = event.value;
    this.idzona = this.matDialogData.idzona;
    this.parametrosService.cambiarParametrosCroquisListado({ambito: ambito, codigo: this.idzona});
  }


  selectUbigeo(row, event) {
    this.urlPdf = `${this.apiEndPointPdf2}${row.ruta_web}`;
    this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(this.urlPdf);
  }

  constructor(
    public dialogRef: MatDialogRef<ReportesSegmentacionComponent>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
    private reporteService: ReporteService, private parametrosService: ParametrosService,
    private domSanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.reporteService.getLoadedDataSourceCroquisListado().subscribe(res => {
      if(res.data){
        if (res.data.length>0){
          this.data = res.data;
          this.columnsToDisplay = res.columnsToDisplay;
          this.displayedColumns = res.displayedColumns;
          this.urlPdf = `${this.apiEndPointPdf2}${res.data[0].ruta_web}`;
          this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(this.urlPdf);

        }
      }

      }
    );
  }

}
