import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import moment from "moment";
import { FormsModule } from '@angular/forms';
import { Reserva } from "../reserva";

@Component({
    selector: 'app-editar-entrenamientos',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './editar-entrenamientos.component.html',
    styleUrl: './editar-entrenamientos.component.css'
    })

    export class EditarEntrenamientosComponent {

        reservas: Reserva[] = [
            new Reserva(7, 'cliente1', 'entrenador1', 8, Date.parse("28-5-2024")),
            new Reserva(15, 'cliente2', 'entrenador1', 16, Date.parse("29-5-2024"))
          ]
     entrenamiento: any;
     horasDis: number[] = this.rellenarHoras();
     fecha: any; 
     activeModal: any;
     horaSelec: string = ''
     confirmacionCancelar: boolean = false
     reservaPendienteCancelar: Reserva = new Reserva(-1, '', '', -1, -1)
     cancelado: boolean = false
     pulsarReserva: boolean = false
     horaNoSeleccionada: boolean = true
    
    constructor() {

    }

    guardarEntrenamiento() {
        throw new Error('Method not implemented.');
    }

    rellenarHoras(): number[]{
        let t: number[] = []
    
        let hora: number = 6;
    
        if(this.fecha) hora = Number.parseInt(moment().format('HH').toString()) + 1; 
    
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

}