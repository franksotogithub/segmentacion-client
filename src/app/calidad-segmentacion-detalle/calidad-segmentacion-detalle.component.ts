import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CalidadSegmentacionComponent } from '../calidad-segmentacion/calidad-segmentacion.component';
import {environment} from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import { CalidadService } from '../services/calidad.service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-calidad-segmentacion-detalle',
  templateUrl: './calidad-segmentacion-detalle.component.html',
  styleUrls: ['./calidad-segmentacion-detalle.component.scss']
})
export class CalidadSegmentacionDetalleComponent implements OnInit {
  private columnsToDisplay = [];
  private displayedColumns = [];
  private idzona;
  aeu:any
  private apiEndPointPdf2 = environment.apiEndPointPdf2;
  private urlPdf = this.apiEndPointPdf2;
  private urlCroquis;
  dataAeus;
  private columnsToDisplayViv = [];
  private displayedColumnsViv = [];
  dataViv;
  
  private columnsToDisplayInd = [];
  private displayedColumnsInd = [];
  dataAeuInd;
  constructor(
    public dialogRef: MatDialogRef<CalidadSegmentacionComponent>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
    private calidadService: CalidadService,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {


    this.idzona = this.matDialogData.idzona;

    this.calidadService.getDataAeuMuestraCalidad(this.idzona).subscribe(res=>{

      if(res.data){
        if (res.data.length>0){
          this.dataAeus = res.data;
          this.columnsToDisplay = res.columnsToDisplay;
          this.displayedColumns = res.displayedColumns;
          this.aeu=this.dataAeus[0];
          this.actualizarDatos(this.aeu);
         
        }

        else{
          this.dataAeus = [];
        }

      }
    });

   }

  /*openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: '', animal: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
*/
  actualizarDatos(aeu){
    this.urlPdf = `${this.apiEndPointPdf2}${aeu.ruta_web}`;
    this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(this.urlPdf);

    this.calidadService.getDataVivMuestraCalidad(aeu.idaeu).subscribe(res=>{



      if (res.data.length>0){
        this.dataViv = res.data;
        this.columnsToDisplayViv = res.columnsToDisplay;
        this.displayedColumnsViv = res.displayedColumns;
        
        this.calidadService.getDataIndAeuMuestraCalidad(aeu.idaeu).subscribe(res=>{

          if (res.data.length>0){
            this.dataAeuInd = res.data;
            this.columnsToDisplayInd = res.columnsToDisplay;
            this.displayedColumnsInd= res.displayedColumns;
            
          }
    
          else{
            this.dataAeuInd = [];
          }
    
          
    
        });
        
      }

      else{
        this.dataViv = [];
      }
    });



  }

  generarMuestra(e){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: {titulo: "Generar Muestra", message: "Estas seguro que deseas generar la muestra?" ,message2:'Se borrara cualquier verificacion anterior'}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('result>>>',result)
      if(result.event=='ejecutar'){

        

        this.calidadService.generarMuestraAeuCalidad(this.idzona).subscribe(r=>{
          if(r.success){
            this.calidadService.getDataAeuMuestraCalidad(this.idzona).subscribe(res=>{
              if(res.data){
                if (res.data.length>0){
                  this.dataAeus = res.data;
                  this.columnsToDisplay = res.columnsToDisplay;
                  this.displayedColumns = res.displayedColumns;
                  this.aeu=this.dataAeus[0];
                  this.actualizarDatos(this.aeu);
                 
                }
        
                else{
                  this.dataAeus = [];
                }
        
              }
  
            });
          }
        });

      }
      
    });
  }


  selectUbigeo(row, event) {
    this.aeu=row;
    this.actualizarDatos(this.aeu);
  }

  actualizarIndicadores(row){
    this.calidadService.actualizarIndicadores(this.aeu.idaeu,this.dataAeuInd[0]).subscribe(r=>{console.log("respuesta>>>",r)});

  }

  evaluarZonaCalidad(){

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: {titulo: "Evaluar Zona", message: "Estas seguro que deseas evaluar la zona?" ,message2:''}
    });


    dialogRef.afterClosed().subscribe(result => {

      if(result.event=='ejecutar'){

        this.calidadService.evaluarZonaCalidad(this.idzona).subscribe(r=>{ console.log("respuesta>>>",r)});
        this.dialogRef.close();
      }
      
    });

    
  }

  close(){


  }
  ngOnInit() {

    
  }

  ngOnDestroy(){

    console.log('dialogo destruido');
  }

}



@Component({
  selector: 'calidad-segmentacion-detalle-dialog',
  templateUrl: 'calidad-segmentacion-detalle-dialog.component.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {


      
    }

    doAction(){
      this.dialogRef.close({ event:'ejecutar'});
    }
 
    closeDialog(){
      this.dialogRef.close({event:'cancelar'});
    }

}