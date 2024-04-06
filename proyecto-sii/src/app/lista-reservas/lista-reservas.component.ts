import { Component, Pipe, PipeTransform } from '@angular/core';
import { ReservaComponent } from '../reserva/reserva.component';
import { CommonModule, Time } from '@angular/common';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [ReservaComponent, CommonModule],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})

export class ListaReservasComponent{

  reservas: ReservaComponent[] = []
  horasDis: Time[] = this.rellenarHoras();
  primeraHora: Time = {hours: 6, minutes: 0}
  ultimaHora: Time = {hours: 23, minutes: 0}

  rellenarHoras(): Time[]{
    let horas: Time[] = []
    for(let i = 6; i<=23; i++){
      horas.push({hours: i, minutes: 0o0})
    }
    return horas
  }

  addReserva(hi: Time, hf: Time){
    
  }

  convertir(value: Time): string {
    if(!value) return '';
    const hora: string = value.hours < 10 ? '0' + value.hours : value.hours.toString();
    const minutos: string = value.minutes < 10 ? value.minutes + '0' : value.minutes.toString();

    return `${hora}:${minutos}`;
  }
}
