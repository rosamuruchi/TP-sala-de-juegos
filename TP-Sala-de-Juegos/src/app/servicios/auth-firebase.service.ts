import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  public user = new Usuario();


  private url = 'https://saladejuegos-c3f57.firebaseio.com';//'https://saladejuegos-c3f57.firebaseio.com';

  constructor(public afAuth: AngularFireAuth, public http:HttpClient) { }

  onRegister(user:Usuario) {
    return new Promise((resolve, rejected) => {

      this.afAuth.createUserWithEmailAndPassword (user.email, user.password).then(us => {
        resolve(us);
      }).catch(err => rejected(err));
    });

  }
   
  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {

      this.afAuth.signInWithEmailAndPassword(email, password).then(us => {
        resolve(us);
      }).catch(err => rejected(err));
    });
  }

  desloguearse() {
    return new Promise((resolve, reject) => {
      this.afAuth.signOut().then(res => {
      }).catch(err => reject(err));
    });
  }

  getUsuario() {
    return this.http.get(`${this.url}/usuarios.json`)
    .pipe(
      // map( resp => this.crearArregloUsuario(resp) )
      // el codigo anterior puedo resumirlo asi :
      map(this.crearArregloUsuario)
    );
  }

    // filtro el get para transformarlo en arreglo
    private crearArregloUsuario(usuariosObj: object) {
      const usuarios: Usuario [] = [];
  
     // console.log( usuariosObj );
  
      if ( usuariosObj === null) { return []; }
  
      Object.keys(usuariosObj).forEach( key => {
  
        const usuario: Usuario = usuariosObj[key];
  

        usuarios.push(usuario);
      });
  
      return usuarios;
    }

    actualizarUsuario(usuario: Usuario) {
      return this.http.put(`${this.url}/usuarios/${usuario.id}.json`, usuario);
  
    }

    async UsuarioLogeado()
    {
      return await this.afAuth.currentUser;
    }


}
  /*loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).
        then(userData => resolve(userData),
          err => reject(err));
    });
    
  }
  logOut() {
    return this.afAuth.auth.signOut();
  }*/

  

