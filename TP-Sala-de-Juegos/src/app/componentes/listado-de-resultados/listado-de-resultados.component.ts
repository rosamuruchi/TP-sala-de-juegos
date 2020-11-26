
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 
 usuarios: Usuario[] = [];
  usuario: Usuario;


  constructor(public usuarioService: AuthFirebaseService) {
   }

  ngOnInit() {
    this.usuarioService.getUsuario()
    .subscribe (resp => {
      // le asigno el array de usuarios de la BD
      this.usuarios = resp;
      this.usuario = this.usuarioService.user;
    });
  }


}
