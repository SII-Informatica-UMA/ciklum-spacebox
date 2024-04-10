import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink  } from '@angular/router';
import { ListaReservasComponent } from '../lista-reservas/lista-reservas.component';
import { Rol } from '../entities/login';
import { UsuariosService } from "../services/usuarios.service";

@Component({
    selector: 'app-entrenamientos',
    standalone: true,
    imports: [RouterOutlet, CommonModule, RouterLink, ListaReservasComponent],
    templateUrl: './entrenamientos.component.html',
    styleUrl: './entrenamientos.component.css'
    })

    export class EntrenamientosComponent {

    entrenamientos: any;
    
    constructor(private usuariosService: UsuariosService) {}
    
    get rol() {
        return this.usuariosService.rolCentro;
    }

    editarEntrenamiento(_t8: any) {
        throw new Error('Method not implemented.');
        }
        
        
     eliminarEntrenamiento(_t8: any) {
        throw new Error('Method not implemented.');
        }

isCliente(): boolean {
    console.log("Pregunta cliente: " + this.rol);
    return this.rol?.rol == Rol.CLIENTE;
}
}