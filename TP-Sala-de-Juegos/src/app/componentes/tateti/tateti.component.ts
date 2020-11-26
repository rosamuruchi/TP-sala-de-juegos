import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { Block } from './block';
import {MatSnackBar} from '@angular/material/snack-bar';
import { GameService } from '../../servicios/game.service'
import { timer } from 'rxjs';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  lock = false;
  mostrarAlert = false;
  mensajeAlert = '';

  nombre = ''

  usuario : Usuario;

  constructor(public gs: GameService, public snackBar: MatSnackBar, public usuarioService: AuthFirebaseService) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.user;
    this.nombre = this.usuario.nombre;
  }

  newGame() {
    this.gs.freeBlocksRemaining = 9;
    this.gs.initBlocks();
    this.lock = false;
    this.gs.turn = 0;
}

resetGame(event) {
    location.reload();
    event.preventDefault();
}

playerClick(i) {
    if( this.gs.blocks[i].free == false || this.lock == true ) { // If Block is already fill, don't Do anything
        return;
    }

    this.gs.freeBlocksRemaining -= 1; // Reduce no. of free blocks after each selection

    if( this.gs.freeBlocksRemaining <= 0 ) {

        this.gs.draw += 1;
        this.lock = true;
        this.snackBar.open("Juego:", "Empate", {
          duration: 4000,
        });
        this.mostrarAlerta(`Juego Empatado`);
        this.newGame();
        return;
    }


    this.gs.blocks[i].free = false;

    if( this.gs.turn == 0 ) { // Player1 Turn
        this.gs.blocks[i].setValue("tick");
    
    } else { // Bot Turn
        this.gs.blocks[i].setValue("cross");
    }

    var complete = this.gs.blockSetComplete();

    if( complete == false ) {
        this.changeTurn(); 
        return;
        
    } else {
        let nombre = '';

        this.lock = true;
        this.gs.players[this.gs.turn].score += 1;
        if (this.gs.turn === 0) {
          nombre = this.usuario.nombre;
          this.usuario.puntajetateti = this.usuario.puntajetateti + 1;
          this.usuario.puntaje = this.usuario.puntaje +1;
          this.actualizarUsuario();
        } else {
          nombre = 'Computadora';
        }
        this.snackBar.open("Ganador ", nombre, {
          duration: 4000,
        });

        this.mostrarAlerta(`Ganador ${nombre}`);



        timer(1000).subscribe(() => {
          this.newGame();
        });
        return;
    }
}


botTurn() {

    if( this.gs.freeBlocksRemaining <= 0 ) {
        return;
    }

    var bot_selected = this.gs.figureBotMove()-1;
    
    if( this.gs.blocks[bot_selected].free == true ) {
        this.playerClick(bot_selected);    
    } else {
        this.botTurn();
        return;
    }

}


changeTurn() {
    var player = this.gs.changeTurn();

    if( player == 1 ) { // Bot Turn
        this.botTurn();

    }
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
