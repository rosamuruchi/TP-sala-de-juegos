import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  imagenUno= '../../../assets/imagenes/vaso1.jpg';
  imagenDos= '../../../assets/imagenes/vaso2.jpg';

  usuario: Usuario;
  nombre = '';

  contadorPierde = 0;
  contadorGana = 0;

  mostrarAlert = false;
  mensajeAlert = '';

  disableIzq = false;
  disableDer = false;

  constructor(public usuarioService: AuthFirebaseService) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.user;
    this.nombre = this.usuarioService.user.nombre;
    console.log(this.usuario);
    console.log(this.usuario.nombre);
  }

  OnClickIzquierda() {
    // random entre 1 y 2
  let  random = Math.floor(Math.random() * 2) + 1;

  if (random === 1) {
    this.mostrarAlerta(`Has adivinado (ganas)${this.usuario.nombre}!`);
    this.imagenUno = '../../../assets/imagenes/vaso_gana.jpg';
    this.imagenDos = '../../../assets/imagenes/vaso_pierde.jpg';
    this.usuario.puntajepelotita = this.usuario.puntajepelotita + 1;
    this.usuario.puntaje = this.usuario.puntaje + 1;

    this.actualizarUsuario();
    this.contadorGana ++;
  } else {
    this.mostrarAlerta(`No has adivinado (pierdes) ${this.usuario.nombre}!`);
    this.imagenUno = '../../../assets/imagenes/vaso_pierde.jpg';
    this.imagenDos = '../../../assets/imagenes/vaso_gana.jpg';
    this.contadorPierde ++;
  }
  this.disableIzq = true;
  this.disableDer = true;

  timer(2000).subscribe(() => {
    this.reseteoImagenes();
    this.disableIzq = false;
    this.disableDer = false;
  });

  }

  OnClickDerecha() {
        // random entre 1 y 2
  let  random = Math.floor(Math.random() * 2) + 1;

  if (random === 1) {
    this.mostrarAlerta(`Has adivinado (ganas) ${this.usuario.nombre}!`);
    this.imagenUno = '../../../assets/imagenes/vaso_pierde.jpg';
    this.imagenDos = '../../../assets/imagenes/vaso_gana.jpg';
    this.usuario.puntajepelotita = this.usuario.puntajepelotita + 1;
    this.usuario.puntaje = this.usuario.puntaje + 1;

    this.actualizarUsuario();
    this.contadorGana ++;
  } else {
    this.mostrarAlerta(`No has adivinado (pierdes) ${this.usuario.nombre}!`);
    this.imagenUno = '../../../assets/imagenes/vaso_gana.jpg';
    this.imagenDos = '../../../assets/imagenes/vaso_gana.jpg';
    this.contadorPierde ++;
  }
  this.disableIzq = true;
  this.disableDer = true;

  timer(2000).subscribe(() => {
    this.reseteoImagenes();
    this.disableIzq = false;
    this.disableDer = false;
  });
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

    reseteoImagenes() {
      this.imagenUno = '../../../assets/imagenes/vaso1.jpg';
      this.imagenDos = '../../../assets/imagenes/vaso2.jpg';
    }

    actualizarUsuario() {
      this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe ( resp => {
      });
    }

}
