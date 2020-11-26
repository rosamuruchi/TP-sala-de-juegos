import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuario: Usuario;

  constructor(public usuarioService: AuthFirebaseService, public router: Router) { }

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
  desloguarse() {
    this.router.navigate(['/inicio']);
    this.usuarioService.desloguearse().then(res => {
       console.log(res);
       
    }).catch(err => console.log(err));
  }
  obtenerUsuario(email) {
    this.usuarios.forEach(user => {
      if (user.email === email) {
        this.usuarioService.user = user;
      }
    });
 }
}
