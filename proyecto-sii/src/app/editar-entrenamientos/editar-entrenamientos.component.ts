import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import moment from "moment";

@Component({
    selector: 'app-editar-entrenamientos',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './editar-entrenamientos.component.html',
    styleUrl: './editar-entrenamientos.component.css'
    })

    export class EditarEntrenamientosComponent {

     entrenamiento: any;
     horasDis: number[] = this.rellenarHoras();
     fecha: any; 
     activeModal: any;
     horaSelec: string = ''
    
    constructor() {

    }

    cancelar() {
        this.activeModal.close()
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

}