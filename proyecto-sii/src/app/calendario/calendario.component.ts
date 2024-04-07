import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink  } from '@angular/router';
import moment from 'moment';
import { ListaReservasComponent } from '../lista-reservas/lista-reservas.component';

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

  constructor() {

  }

  ngOnInit() {
    this.getDaysFromDate(1, 2024)
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

}
