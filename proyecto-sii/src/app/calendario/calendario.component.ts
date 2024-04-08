import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink  } from '@angular/router';
import moment from 'moment';
import { ListaReservasComponent } from '../lista-reservas/lista-reservas.component';
import { Usuario, UsuarioImpl } from '../entities/usuario';
import { Rol } from '../entities/login';
import { UsuariosService } from '../services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, ListaReservasComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {
  title = 'proyecto-sii';

  week: any = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"] ;

  monthSelect: any[] | undefined;
  dateSelect: any ;

  constructor(private usuariosService: UsuariosService, private modalService: NgbModal) {
   
  }

  private get rol() {
    return this.usuariosService.rolCentro;
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

  ngOnInit() {
    this.getDaysFromDate(moment().month() + 1, moment().year()) ;
  }

  isBeforeToday(day: any) {
    const today = moment()  ; 
    console.log(today) ;
    const monthYear = this.dateSelect.format('MM-YYYY') ;
    const parse = `${day.value}-${monthYear}` ;
    const dayObject = moment(parse) ;
    return dayObject.isBefore(today, 'day') ;
  }

  isBeforeDate(day:any, date: any) {
    const today = `${moment().format('YYYY-MM-DD')}`  ; 
    const parse = `${date}-${day.value}` ;
    const dayObject = moment(parse) ;
    console.log(dayObject) ;
    console.log(today) ;
    return dayObject.isBefore(today, 'day') ;
  }

  isAfterDate(day:any, date: any) {
    const today = `${moment().format('YYYY-MM-DD')}`  ; 
    const parse = `${date}-${day.value}` ;
    const dayObject = moment(parse) ;
    console.log(dayObject) ;
    console.log(today) ;
    return dayObject.isAfter(today, 'day') ;
  }

  isToday(day:any, date: any) {
    const today = `${moment().format('YYYY-MM-DD')}`  ; 
    const parse = `${date}-${day.value}` ;
    const dayObject = moment(parse) ;
    console.log(dayObject) ;
    console.log(today) ;
    return dayObject.isSame(today, 'day') ;
 
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays)

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any ) => {
      a = parseInt(a) + 1 ;
      const dayObject = moment(`${year}-${month}-${a}`)
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      }
    }) ;
    this.monthSelect = arrayDays ;
  }



  changeMonth(flag: number) {
    if(flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month') ;
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY')) ;
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month') ;
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY')) ;
    }
  }

  clickDay(day: any) {
    /*
    const monthYear = this.dateSelect.format('MM-YYYY') ;
    const parse = `${monthYear}-{day.value}` ;
    console.log(day) ;
    console.log(monthYear) ;
    */

    if(!this.isBeforeToday(day)) {
    let ref = this.modalService.open(ListaReservasComponent);
   }
}

}
