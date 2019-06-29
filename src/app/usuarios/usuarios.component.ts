import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UsuarioService} from '../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: any[];
  columnsToDisplay: string[];

  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private usuarioService: UsuarioService) { }
  selectUsuario(row,event){
    console.log('row>>',row,'event',event);
  }

  ngOnInit() {
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

}
