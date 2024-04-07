import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../reserva';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})

export class ListaReservasComponent{

  reservas: Reserva[] = []
  primeraHora: Time = {hours: 6, minutes: 0}
  ultimaHora: Time = {hours: 23, minutes: 0}


  convertir(value: any): string {
    if(!value) return '';
    let t = {hours: value, minutes: 0};
    const hora: string = t.hours < 10 ? '0' + t.hours : t.hours.toString();
    const minutos: string = t.minutes < 10 ? t.minutes + '0' : t.minutes.toString();

    return `${hora}:${minutos}`;
  }
  
  range(start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }

}
