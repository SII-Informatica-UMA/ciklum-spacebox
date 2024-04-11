import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../reserva';
import { FormsModule } from '@angular/forms';
import { Rol } from '../entities/login';
import { UsuariosService } from '../services/usuarios.service';
import moment from 'moment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarEntrenamientosComponent } from '../editar-entrenamientos/editar-entrenamientos.component';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, EditarEntrenamientosComponent],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})

export class ListaReservasComponent{

  reservas: Reserva[] = [
    new Reserva(7, 'cliente1', 'entrenador1', 8, Date.parse("28-5-2024")),
    new Reserva(15, 'cliente2', 'entrenador1', 16, Date.parse("29-5-2024"))
  ]
  fecha!: any; 
  horasDis: number[] = this.rellenarHoras();
  horaSelec: string = ''
  pulsarReserva: boolean = false
  horaNoSeleccionada: boolean = true
  periodicidad: string = "cita-unica"
  confirmacionCancelar: boolean = false
  reservaPendienteCancelar: Reserva = new Reserva(-1, '', '', -1, -1)
  cancelado: boolean = false
  pulsarAnadir: boolean = false
  pulsarEditar: boolean = false

  nombreCliente: string = ''
  
  private get rol() {
    return this.usuariosService.rolCentro;
  }

  constructor(private usuariosService: UsuariosService, public activeModal: NgbActiveModal){

  }
  
  rellenarHoras(): number[]{
    let t: number[] = []

    let hora: number = 6;

    if(this.fecha.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) hora = Number.parseInt(moment().format('HH').toString()) + 1; 

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

  hacerReserva(){
    if(this.horaSelec == ''){
      console.log('ERROR')
      this.pulsarReserva = true;
    } else {   
      let h = parseInt(this.horaSelec.substring(0,2))
      console.log(h)
      this.horasDis = this.horasDis.filter((elemento) => elemento != h)
      this.horaSelec = ''
      
      let r = new Reserva(h, 'cliente', 'entrenador', 8, this.fecha);
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

  reservaPeriodica(){

    let year : string = this.fecha.year;
    let stringAux : string = "-12-31";

    year+=stringAux;

    let final: Date = this.fecha;

    if(this.periodicidad == "cita-unica"){
      this.hacerReserva()
    }else if(this.periodicidad == "semanal"){

      while(this.fecha <= moment(year)){
        
        this.hacerReserva();
        final.setDate(final.getDate() + 7);
      }
      
    }else{
      
      while(this.fecha <= moment(year)){

        this.hacerReserva()
        final.setMonth(final.getMonth()+1);
        this.fecha = final;
      }

    }
  }

  salir(){
    this.activeModal.close()
  }

  confirmarCancelar(r: Reserva) {
    this.confirmacionCancelar = true
    this.reservaPendienteCancelar = r
  }

  cancelar() {
    for(let i = 0; i < this.reservas.length; i++) {
      if(this.reservas[i] == this.reservaPendienteCancelar) {
          this.reservas[i] = this.reservas[this.reservas.length - 1];
          this.reservas.pop();
      }
    }
    this.cancelado = true
  }
}

