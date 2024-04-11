import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../reserva';
import { FormsModule } from '@angular/forms';
import { Rol } from '../entities/login';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})

export class ListaReservasComponent{

  reservas: Reserva[] = [
    new Reserva(7, 'cliente1', 'entrenador1'),
    new Reserva(15, 'cliente2', 'entrenador1')
  ]
  
  horasDis: number[] = this.rellenarHoras();
  horaSelec: string = ''
  pulsarReserva: boolean = false
  horaNoSeleccionada: boolean = true
  reservasEmpty: boolean = true

  private get rol() {
    return this.usuariosService.rolCentro;
  }

  constructor(private usuariosService: UsuariosService){

  }
  
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

  hacerReserva(){
    if(this.horaSelec == ''){
      console.log('ERROR')
      this.pulsarReserva = true;
    } else {   
      let h = parseInt(this.horaSelec.substring(0,2))
      console.log(h)
      this.horasDis = this.horasDis.filter((elemento) => elemento != h)
      this.horaSelec = ''
      
      let r = new Reserva(h, 'cliente', 'entrenador');
      this.reservas.push()
      this.pulsarReserva = true;
      this.horaNoSeleccionada = false;
      this.reservasEmpty = false;
    }
  }

  activo(){
    return 0;
  }
  activa(){

  }
 desactiva(){

 }

}

