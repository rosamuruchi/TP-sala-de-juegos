import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuario: Usuario;
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  constructor(public usuarioService: AuthFirebaseService) {  }

  ngOnInit() {
    this.usuarioService.getUsuario()
    .subscribe (resp => {
      // le asigno el array de usuarios de la BD
      this.usuarios = resp;

      // busco los datos del usuario que se logueo y los guardo en el atributo "usuario"
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

 

}
