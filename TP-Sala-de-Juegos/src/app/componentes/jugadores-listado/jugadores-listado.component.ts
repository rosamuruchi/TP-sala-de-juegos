import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { JugadoresService } from '../../servicios/jugadores.service';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario;

  listado:any
  miJugadoresServicio:JugadoresService
  
    constructor(serviceJugadores:JugadoresService,public usuarioService: AuthFirebaseService) {
      //this.miJugadoresServicio = serviceJugadores;
      
    }
    


  ngOnInit() {
    this.usuarioService.getUsuario()
    .subscribe (resp => {
      // le asigno el array de usuarios de la BD
      this.usuarios = resp;
      this.usuario = this.usuarioService.user;
      this.obtenerUsuario(this.usuarioService.user.email);
      console.log(this.usuarioService.user);
    });
  }

  obtenerUsuario(email) {
    this.usuarios.forEach(user => {
      if (user.email === email) {
        this.usuarioService.user = user;
      }
    });
 }
 /* TraerTodos(){
    //alert("totos");
    this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
  TraerGanadores(){
    this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
  TraerPerdedores(){
    this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
*/
}
