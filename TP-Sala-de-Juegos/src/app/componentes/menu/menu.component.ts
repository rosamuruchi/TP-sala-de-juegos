import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario;

  constructor(public usuarioService: AuthFirebaseService,private route: ActivatedRoute,
    private router: Router) { }

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
 
  Juego(tipo: string) {
    switch (tipo) {
      case 'Pelotita':
          this.router.navigate(['/Juegos/Pelotita']);
        break;
      case 'Tateti':
          this.router.navigate(['/Juegos/Tateti']);
        break;
      case 'Anagrama':
          this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 'PPT':
          this.router.navigate(['/Juegos/PPT']);
        break;
    }
  }

}
