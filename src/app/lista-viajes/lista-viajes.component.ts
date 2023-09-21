import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { DestinoViajes } from '../model/destino-viajes.model';
import { DestinoApiModel } from '../model/destino-api.model';
import { AppState } from '../app.module';
import { Store } from '@ngrx/store';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../model/destino-viajes-state.model';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.css'],
})

export class ListaViajesComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViajes>;

  destinos: DestinoViajes[];

  ultimaSuscripcion: string[];


  constructor(public destinoApiModel: DestinoApiModel, public store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.ultimaSuscripcion = [];
    this.store.select(state => state.destinos.favorito).
      subscribe(d => {
        if (d != null) {
          this.ultimaSuscripcion.push(`Se ha elegido a + d.nombre`);
        }
      });
  }

  ngOnInit() {

  }

  agregado(d: DestinoViajes) {

    this.destinoApiModel.add(d);
    this.onItemAdded.emit(d);

  }

  elegido(e: DestinoViajes) {

    this.destinoApiModel.getAll().forEach(x => x.setSelected(false));
    e.setSelected(true);
    const nombreDestino = e.nombre;
    this.ultimaSuscripcion.push(`Preferiste el destino: ${nombreDestino}`);
  }
}


/* ESTA ES LA OPCION DONDE GUARDA TODAS LAS SUSCRIPCIONES EN UN ARRAY Y LAS MUESTRA EN EL HTML
import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { DestinoViajes } from '../model/destino-viajes.model';
import { DestinoApiModel } from '../model/destino-api.model';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.css'],
})

export class ListaViajesComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViajes>;

  destinos: DestinoViajes[];

  ultimaSuscripcion: string[] = [];


  constructor(public DestinoApiModel: DestinoApiModel) {
    this.onItemAdded = new EventEmitter();
    this.destinos = [];
    this.ultimaSuscripcion.push();
  }

  ngOnInit() {
    this.destinos = this.DestinoApiModel.getAll();

    this.DestinoApiModel.getPreferidoObservable().subscribe(destino => {
      if (destino) {
        const nombreDestino = destino.nombre;
        this.ultimaSuscripcion.push(`Preferiste el destino: ${nombreDestino}`);
        console.log(this.ultimaSuscripcion);
      }
    });
  }
  agregado(d: DestinoViajes) {
    this.DestinoApiModel.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e: DestinoViajes) {
    this.DestinoApiModel.getAll().forEach(x => x.setSelected(false));
    e.setSelected(true);
    const nombreDestino = e.nombre;
    this.ultimaSuscripcion.push(`Preferiste el destino: ${nombreDestino}`);
  }

  suscribirseALaNotificacion(viaje: string) {
    this.DestinoApiModel.suscribirseAViaje(viaje);
  }
} */