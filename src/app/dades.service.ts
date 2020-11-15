import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DadesService {

  constructor(private db: AngularFirestore) { }

  llegirDades() {
    return this.db.collection('tresenratlla').snapshotChanges();

  }

  inserirItem(nomItem) {
    this.db.collection('items').add(
      {
        nom: nomItem
      }
    );
  }

  eliminarItem(identificador) {
    this.db.collection('items').doc(identificador).delete();
  }

  guardarDades(Dades) {
    this.db.collection('tresenratlla').doc(Dades.id).update (
      {
        fila0: Dades.fila0,
        fila1: Dades.fila1,
        fila2: Dades.fila2,
        jugador1: Dades.jugador1,
        jugador2: Dades.jugador2,
        torn: Dades.torn

      }
    );
  }

  llegirUnItem(idItem){
    return  this.db.collection('items').doc(idItem).snapshotChanges();
  }

}
