
export class Reserva {
    horaIni: number = 0
    cliente: string = ''
    entrenador: string = ''

    constructor(h: number, c: string, e: string){
        this.horaIni = h
        this.cliente = c
        this.entrenador = e
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