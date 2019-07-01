import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UsuarioService} from '../services/usuario.service';
import {UsuarioDialogBoxComponent} from '../usuario-dialog-box/usuario-dialog-box.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: any[];
  columnsToDisplay: string[];
  usuarioSelect:any;
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private usuarioService: UsuarioService,public dialog: MatDialog) { }
  
  selectUsuario(row,event){
    this.usuarioSelect=row;
    //console.log('row>>',row,'event',event);
  }

  openDialog(action,obj){
    this.usuarioSelect=obj;
    const dialogRef = this.dialog.open(UsuarioDialogBoxComponent,{
    width:'250px',
    data:{ data: obj,action:action}

    }); 

    dialogRef.afterClosed().subscribe(result=>{
      if(result.event=='delete'){
        let id=this.usuarioSelect._id;
        this.usuarioService.deleteUsuario(id).subscribe(res=>{
          this.getUsuarios();
        });
      }
    });
  }

  getUsuarios():void {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.columnsToDisplay = res.columnsToDisplay;
      this.displayedColumns = res.displayedColumns;
      this.columnsToDisplay.push('update');
      this.columnsToDisplay.push('delete');
      this.dataSource.data = res.data;
      this.dataSource.sort = this.sort;
      }
    );

  }

  ngOnInit() {

      this.getUsuarios();
    

  }

}
