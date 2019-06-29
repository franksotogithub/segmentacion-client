import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UsuarioService} from '../services/usuario.service'
import {Usuario} from "../interfaces/usuario";

@Component({
  selector: 'app-usuarios-detalle',
  templateUrl: './usuarios-detalle.component.html',
  styleUrls: ['./usuarios-detalle.component.scss']
})
export class UsuariosDetalleComponent implements OnInit {
  private  usuario: Usuario;
  constructor(private route: ActivatedRoute, private  usuarioService: UsuarioService) {
  }

  getUsuario(id):void{
    this.usuarioService.getUsuario(id).subscribe((usuario)=>{
      this.usuario=usuario;
    });
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.getUsuario(id);
    }
  }

}
