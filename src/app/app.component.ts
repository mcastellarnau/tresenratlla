import { Component } from '@angular/core';
import { DadesService } from './dades.service';
import { Dades } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tresenratlla';
  dades: Dades;
  jugador = "-";

  constructor(public serveiDades: DadesService) {}

  ngOnInit(): void {
    this.serveiDades.llegirDades().subscribe((resp) => {
      var resultat: any;
      resultat = resp[0].payload.doc.data();
      this.dades = resultat;
      this.dades.id = resp[0].payload.doc.id;
      if (this.dades.torn==="-") {
        this.jugador="-";
      }
    });

  }
  tirada(fila, col) {
    if (this.dades.jugador1 && this.dades.jugador2){
      if(this.dades.torn === this.jugador){
        console.log(fila, col);
        switch (fila) {
          case 0: {
            this.dades.fila0[col] = this.jugador;
            break;
          }
          case 1: {
            this.dades.fila1[col] = this.jugador;
            break;
          }
          case 2: {
            this.dades.fila2[col] = this.jugador;
            break;
          }
        }
        if (this.jugador === "X")
        {
          this.dades.torn = "O";
        }
        else{
          this.dades.torn = "X";
        }
        this.serveiDades.guardarDades(this.dades);

      }
    }

  }

  reset() {
    this.dades.jugador1 = false;
    this.dades.jugador2 = false;
    for (let i = 0; i < 3; i++) {
      this.dades.fila0[i] = "-";
      this.dades.fila1[i] = "-";
      this.dades.fila2[i] = "-";
    }
    this.dades.torn = "-";
    this.jugador="-";
    this.serveiDades.guardarDades(this.dades);
  }
  iniciarJugador(j) {
    if (j === 1) {
      this.dades.jugador1 = true;
      this.jugador = "X";
      if (this.dades.torn === "-"){
        this.dades.torn = "X";
      }
    } else {
      this.dades.jugador2 = true;
      this.jugador = "O";
      if (this.dades.torn === "-"){
        this.dades.torn = "O";
      }
    }
    this.serveiDades.guardarDades(this.dades);
  }

  comprovarGuanyador(){

  }
}
