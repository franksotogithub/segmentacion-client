import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reporte-dialog-box',
  templateUrl: './reporte-dialog-box.component.html',
  styleUrls: ['./reporte-dialog-box.component.css']
})
export class ReporteDialogBoxComponent implements OnInit {
  data:any;
  zona:String;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any
    ) { 

      this.zona = this.matDialogData.zona;
    }


    closeDialog(){
      this.dialogRef.close();
    }

  ngOnInit() {
  }

}

/*
action:String;
data:any;

actionItems=[ {action:'delete',actionLabelButton:'Eliminar',actionTitle:'Eliminar Usuario', actionMessage:'¿Desea eliminar al usuario?' }];
actionItemSelect:any=this.actionItems[0];
constructor(
  public dialogRef: MatDialogRef<any>,
  @Inject(MAT_DIALOG_DATA) public matDialogData: any,
) {
    this.data=  this.matDialogData.data ;
    this.action=this.matDialogData.action;
    this.actionItemSelect=this.actionItems.find(x=>x.action==this.action);
 }

 doAction(){
   this.dialogRef.close({ event:this.action,data:this.data});
 }

 closeDialog(){
   this.dialogRef.close({event:'cancel'});
 }

ngOnInit() {
}*/