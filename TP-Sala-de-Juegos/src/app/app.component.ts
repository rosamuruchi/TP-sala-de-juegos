import { Component } from '@angular/core';
import { AuthFirebaseService } from './servicios/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'tp';
  email: string;
  password: string;

  mostrarAlert = false;
  mensajeAlert = '';

  constructor (public authFirebaseService: AuthFirebaseService, public router: Router) {

  }

  checkEmptyInputs() {
    if (this.email && this.password) {
      return false;
    } else {
      // this.mostrar = true;
      return true;
    }
  }

  OnSubmitLogin() {
    this.authFirebaseService.login(this.email, this.password).then(res => {
      this.router.navigate(['/inicio']);
    // }).catch(err => alert('Los datos son incorrectos o no existe el usuario') );
  }).catch(err => this.ngValidarError(err.code));
  }

    //  valida errores que se dan desde firebase al loguearse
  ngValidarError( err ) {
    console.log(err);
    switch (err) {
        case 'auth/argument-error':
          err = 'Debe completar todos los campos';
          break;
        case 'auth/invalid-email':
            err = 'Formato de email no correcto';
            break;
        case 'auth/user-not-found':
            err = 'Usuario no valido';
            break;
        case 'auth/wrong-password':
              err = 'Contraseña incorrecta';
              break;
        default:
          err = 'ERROR';
          break;
      }

    this.mostrarAlerta(err);
    }

  // muestro el alert
  mostrarAlerta(err) {
    this.mostrarAlert = true;
    this.mensajeAlert = err;
  }

  // cuando doy click al icono de "x" para cerrarlo 
  noMostrarAlert() {
    this.mostrarAlert = false;
  }
}
