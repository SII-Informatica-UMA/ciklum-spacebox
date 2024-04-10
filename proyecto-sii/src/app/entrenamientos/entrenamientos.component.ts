import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink  } from '@angular/router';
import { ListaReservasComponent } from '../lista-reservas/lista-reservas.component';
import { Rol } from '../entities/login';
import { UsuariosService } from "../services/usuarios.service";
import { Reserva } from "../reserva";

@Component({
    selector: 'app-entrenamientos',
    standalone: true,
    imports: [RouterOutlet, CommonModule, RouterLink, ListaReservasComponent],
    templateUrl: './entrenamientos.component.html',
    styleUrl: './entrenamientos.component.css'
    })

    export class EntrenamientosComponent {

    entrenamientos: Reserva[] =  [new Reserva(7, 'cliente1', 'entrenador1', 8, Date.parse("28-5-2024")), new Reserva(8, 'cliente2', 'entrenador2', 9, Date.parse("27-5-2024"))]; 
    
    constructor(private usuariosService: UsuariosService) {}
    
    get rol() {
        return this.usuariosService.rolCentro;
    }

    editarEntrenamiento(reserva: Reserva) {
        for(let i = 0; i < this.entrenamientos.length; i++) {
            if(this.entrenamientos[i] == reserva) {
                this.entrenamientos[i]
            }
        }
    }
        
        
     eliminarEntrenamiento(reserva: Reserva) {
        for(let i = 0; i < this.entrenamientos.length; i++) {
            if(this.entrenamientos[i] == reserva) {
                this.entrenamientos[i] = this.entrenamientos[this.entrenamientos.length - 1];
                this.entrenamientos.pop();
            }
        }
    
    }

isCliente(): boolean {
    console.log("Pregunta cliente: " + this.rol);
    return this.rol?.rol == Rol.CLIENTE;
}

isEntrenador(): any {
    console.log("Pregunta entrenador: " + this.rol);
    return this.rol?.rol == Rol.ENTRENADOR;
    }
}