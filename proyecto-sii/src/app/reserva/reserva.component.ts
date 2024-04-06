import { Time } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``
})
export class ReservaComponent {
  horaIni: Time = {hours: 0, minutes: 0}
  horaFin: Time = {hours: 0, minutes: 0}
  cliente: string = ''
  entrenador: string = ''

  setHoraIni(h: Time){
    this.horaIni = h
  }

  setHoraFin(h: Time){
    this.horaFin = h
  }

  setCliente(c: string){
    this.cliente = c
  }

  setEntrenador(e: string){
    this.entrenador = e
  }

  crearReserva(hi: Time, hf: Time, c: string, e: string){
    this.horaIni = hi
    this.horaFin = hf 
    this.cliente = c
    this.entrenador = e
  }

}