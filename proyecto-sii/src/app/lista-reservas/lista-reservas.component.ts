import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../reserva';
import { FormsModule } from '@angular/forms';
import { Rol } from '../entities/login';
import { UsuariosService } from '../services/usuarios.service';
import moment from 'moment';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})

export class ListaReservasComponent{

  reservas: Reserva[] = [
    new Reserva(7, 'cliente1', 'entrenador1', 8),
    new Reserva(15, 'cliente2', 'entrenador1', 16)
  ]
  aux!: boolean; 
  horasDis: number[] = this.rellenarHoras();
  horaSelec: string = ''
  pulsarReserva: boolean = false
  horaNoSeleccionada: boolean = true

  private get rol() {
    return this.usuariosService.rolCentro;
  }

  constructor(private usuariosService: UsuariosService){

  }
  
  rellenarHoras(): number[]{
    let t: number[] = []

    let hora: number = 6;

    if(this.aux) hora = Number.parseInt(moment().format('HH').toString()) + 1; 

    if(hora < 6) hora = 6;

    for(let i= hora; i<=23; i++){
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
      this.pulsarReserva = true;
    } else {   
      let h = parseInt(this.horaSelec.substring(0,2))
      console.log(h)
      this.horasDis = this.horasDis.filter((elemento) => elemento != h)
      this.horaSelec = ''
      
      let r = new Reserva(h, 'cliente', 'entrenador', 8);
      this.reservas.push()
      this.pulsarReserva = true;
      this.horaNoSeleccionada = false;
    }
  }

  isCliente(): boolean {
    console.log("Pregunta cliente: "+this.rol);
    return this.rol?.rol == Rol.CLIENTE;
  }

  isEntrenador(): boolean {
    console.log("Pregunta entrenador: "+this.rol);
    return this.rol?.rol == Rol.ENTRENADOR;
  }

  isClienteEntrenador(): boolean {
    console.log("Pregunta cliente o entrenador: "+this.rol);
    return this.rol?.rol == Rol.ENTRENADOR || this.rol?.rol == Rol.CLIENTE;
  }

  mostrarReserva(r: Reserva): string {

    return this.convertir(r.horaIni) + ' - '+ r.cliente
  }

}

