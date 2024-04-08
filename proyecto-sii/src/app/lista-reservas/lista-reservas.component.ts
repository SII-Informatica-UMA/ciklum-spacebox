import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../reserva';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})

export class ListaReservasComponent{

  //reservas: Reserva[] = []
  horasDis: number[] = this.rellenarHoras();
  horaSelec: string = ''

  
  rellenarHoras(): number[]{
    let t: number[] = []

    for(let i=6; i<=23; i++){
      t.push(i)
    }
    return t
  }

  convertir(t: number): string {
    if(!t) return '';
    const hora: string = t < 10 ? '0' + t : t.toString();

    return `${hora}:00`;
  }
  
  range(start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }

  hacerReserva(){
    if(this.horaSelec == ''){
      console.log('ERROR')
    } else {   
      let h = parseInt(this.horaSelec.substring(0,2))
      console.log(h)
      this.horasDis = this.horasDis.filter((elemento) => elemento != h)
      this.horaSelec = ''
    }
  }
}
