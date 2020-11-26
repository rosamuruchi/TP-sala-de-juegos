import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuario: Usuario;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public usuarioService: AuthFirebaseService) { }


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
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
          this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
          this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
      case 'Anagrama':
          this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 'Tateti':
          this.router.navigate(['/Juegos/Tateti']);
        break;
      case 'Memory':
          this.router.navigate(['/Juegos/Pelotita']);
        break;
      case 'PPT':
          this.router.navigate(['/Juegos/PPT']);
        break;
      

    }
  }
}
