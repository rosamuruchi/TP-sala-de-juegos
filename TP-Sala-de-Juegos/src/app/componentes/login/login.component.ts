import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'tp';
  email: string;
  password: string;

  mostrarAlert = false;
  mensajeAlert = '';

  constructor(public authService: AuthFirebaseService, public router: Router) { }

  ngOnInit() {
  }

   // si no se completan ambos inputs se mantiene desactivado el boton de enviar
   checkEmptyInputs() {
    if (this.email && this.password) {
      return false;
    } else {
      // this.mostrar = true;
      return true;
    }
  }

  OnSubmitLogin() {
    this.authService.login(this.email, this.password).then(res => {
      this.authService.user.email = this.email;
      
      this.router.navigate(['/Principal']);
      
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



 
  /*private subscription: Subscription;
  usuario = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  ngOnInit() {
  }
  
  Entrar() {
    if (this.usuario === 'admin' && this.clave === 'admin') {
      this.router.navigate(['/Principal']);
    }
  }
  MoverBarraDeProgreso() {
    
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="NSA spy..."; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      console.log("inicio");
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Verificando ADN..."; 
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje="Adjustando encriptación.."; 
          break;
          case 60:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando Info del dispositivo..";
          break;
          case 75:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
          break;
          case 85:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Instalando KeyLogger..";
          break;
          
        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }     
    });
    //this.logeando=true;
  }*/

}
