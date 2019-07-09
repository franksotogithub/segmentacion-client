import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-usuario-dialog-box',
  templateUrl: './usuario-dialog-box.component.html',
  styleUrls: ['./usuario-dialog-box.component.scss']
})
export class UsuarioDialogBoxComponent implements OnInit {
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
  }

}
