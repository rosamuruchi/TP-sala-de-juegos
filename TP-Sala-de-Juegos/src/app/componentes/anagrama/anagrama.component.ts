import { Component, OnInit } from '@angular/core';
import { PalabrasService } from '../../servicios/palabras.service';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { Palabra } from '../../clases/palabra';
import { Usuario } from '../../clases/usuario';


@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  // lo que ingresa el usuario
  dato = '';
  contador = 0;

  nombre = '';
  palabra = '';

  usuario: Usuario;

  intentos = 0;
  contadorGana = 0;

  mostrarAlert = false;
  mensajeAlert = '';

  constructor(public palabrasService: PalabrasService, public usuarioService: AuthFirebaseService) { }

  ngOnInit() {
    console.log(this.palabrasService.listado);
    this.usuario = this.usuarioService.user;
    this.palabra = this.palabrasService.listado[this.contador].anagrama;
    this.nombre = this.usuarioService.user.nombre;
    console.log(this.palabra);
  }

  validarPalabra() {
    if (this.dato === this.palabrasService.listado[this.contador].nombre) {
      this.usuario.puntaje = this.usuario.puntaje + 1;
      this.usuario.puntajeanagrama = this.usuario.puntajeanagrama + 1;
      this.contadorGana++;

      this.mostrarAlerta('Has adivinado la palabra: ' + this.dato);

      // this.actualizarUsuario();

      this.contador++;
      // actualizo y cambio la palabra
      this.palabra = this.palabrasService.listado[this.contador].anagrama;
      this.actualizarUsuario();
      console.log(this.dato);
    } else {
      this.intentos++;
    }
  }

  actualizarUsuario() {
    this.usuarioService.actualizarUsuario(this.usuario)
    .subscribe ( resp => {
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

}
