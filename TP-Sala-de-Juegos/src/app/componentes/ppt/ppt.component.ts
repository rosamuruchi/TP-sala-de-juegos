import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {
  usuarios: Usuario[] = [];


  terminoJuego:boolean;
  gano:boolean;
  resultado:string;
  opciones:string[] = ['piedra', 'papel', 'tijera']
  opcionUsuario:string;
  opcionMaquina:string;
  claseBtnUsuario:string;
  claseBtnMaquina:string;

  usuario: Usuario;
  nombre = '';
  contadorPierde = 0;
  contadorGana = 0;
  mostrarAlert = false;
  mensajeAlert = '';

  constructor(public usuarioService: AuthFirebaseService) {
    this.usuario = this.usuarioService.user;
    this.nombre = this.usuarioService.user.nombre;
    this.opcionMaquina = "";
    this.opcionUsuario = "";
    this.terminoJuego = false;
   }

  ngOnInit(): void {
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

  //Asigna la opción que eligió el usuario
  ElegirOpcion(opcion:string) {

    this.opcionUsuario = opcion;
    this.claseBtnUsuario = 'btn-' + opcion;

  }

  //Elige un resultado para la maquina
  GenerarOpcionRandom() {
    let indiceRandom  = Math.floor( Math.random() * (this.opciones.length - 0) + 0);

    this.opcionMaquina = this.opciones[indiceRandom];
    this.claseBtnMaquina = 'btn-' + this.opcionMaquina;
  }

  //Compara las opciones y muestra el resultado
  CompararResultado() {

    //Generar una opción para la máquina:
    this.GenerarOpcionRandom();

    if(this.opcionUsuario == this.opcionMaquina) {
      this.gano = false;
      this.resultado = 'EMPATE';
      this.mostrarAlerta(`Empate!! (no pierdes ni ganas)${this.usuario.nombre}!`);
    }
    else
    {
      switch(this.opcionUsuario) {
        case 'piedra':
          if(this.opcionMaquina == 'tijera') {
            this.mostrarAlerta(`Has adivinado (ganas)${this.usuario.nombre}!`);
            this.gano = true;
            this.resultado = 'GANASTE';
            this.usuario.puntajeppt=this.usuario.puntajeppt+1;
            this.actualizarUsuario();
            this.contadorGana ++;
          } else {
            this.mostrarAlerta(`No has adivinado (pierdes) ${this.usuario.nombre}!`);
            this.gano = false;
            this.resultado = 'PERDISTE'
          }
          break;

        case 'papel':
          if(this.opcionMaquina == 'piedra') {
            this.mostrarAlerta(`Has adivinado (ganas)${this.usuario.nombre}!`);
            this.gano = true;
            this.resultado = 'GANASTE';
            this.usuario.puntajeppt=this.usuario.puntajeppt+1;
            this.actualizarUsuario();
            this.contadorGana ++;
          } else {
            this.mostrarAlerta(`No has adivinado (pierdes) ${this.usuario.nombre}!`);
            this.gano = false;
            this.resultado = 'PERDISTE'
          }
          break;

        case 'tijera':
          if(this.opcionMaquina == 'papel') {
            this.mostrarAlerta(`Has adivinado (ganas)${this.usuario.nombre}!`);
            this.gano = true;
            this.resultado = 'GANASTE';
            this.usuario.puntajeppt=this.usuario.puntajeppt+1;
            this.actualizarUsuario();
            this.contadorGana ++;
          } else {
            this.mostrarAlerta(`No has adivinado (pierdes) ${this.usuario.nombre}!`);
            this.gano = false;
            this.resultado = 'PERDISTE'
          }
          break;
      }
    }
    this.terminoJuego = true;
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

  actualizarUsuario() {
    this.usuarioService.actualizarUsuario(this.usuario)
    .subscribe ( resp => {
    });
  }

}
