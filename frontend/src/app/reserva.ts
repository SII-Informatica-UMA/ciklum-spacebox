
export class Reserva {
    idReserva: number = -1
    horaIni: number = 0
    horaFin: number = 0
    cliente: string = ''
    entrenador: string = ''
    idCliente: number = -1
    idEntrenador: number = -1
    fecha!: any

    constructor(h: number, c: string, e: string, f:number, fe: any){
        this.horaIni = h
        this.cliente = c
        this.entrenador = e
        this.horaFin = f
        this.fecha = fe
    }
    
    setHoraIni(h: number){
        this.horaIni = h
    }

    setCliente(c: string){
        this.cliente = c
    }

    setEntrenador(e: string){
        this.entrenador = e
    }


}