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
  private  usuario: Usuario ={ nombres:'',username:'',apellidos:'',id:'',email:'',password:''};
  //private  usuario: Usuario ;
  private action='Registrar';
  private message: String='';
  constructor(private route: ActivatedRoute, private  usuarioService: UsuarioService) {
  }

  getUsuario(id):void{
    this.usuarioService.getUsuario(id).subscribe((usuario)=>{
      this.usuario=usuario;
    });
  }

  updateUsuario(){
    let id = this.route.snapshot.paramMap.get('id');
    this.usuarioService.updateUsuario(id,this.usuario).subscribe(res=>{
      this.message=res.message;
    });
  }

  addUsuario(){
    this.usuarioService.addUsuario(this.usuario).subscribe(res=>{
      this.message=res.message;
    });
  }

  submit(){
    (this.action=='Registrar')?this.addUsuario():this.updateUsuario();
    
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.action='Actualizar';
      this.getUsuario(id);
    }

    else{this.action='Registrar';}
  }

}
