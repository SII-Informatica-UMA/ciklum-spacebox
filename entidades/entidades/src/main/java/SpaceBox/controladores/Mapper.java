
public class Mapper {
    public static EventoDTO toEventoDTO(Evento e){
        return EventoDTO.builder()
                .id(e.getId())
                .nombre(e.getNombre())
                .descripcion(e.getDescripcion())
                .observaciones(e.getObservaciones())
                .lugar(e.getLugar())
                .duracionMinutos(e.getDuracionMinutos())
                .inicio(e.getInicio())
                .reglaRecurrencia(e.getReglaRecurrencia())
                .idCliente(e.getIdCliente())
                .tipo(e.getTipo())
                .build();
    }

    public static Evento toEvento(EventoNuevoDTO e){
        return Evento.builder()
                .id(e.getId())
                .nombre(e.getNombre())
                .descripcion(e.getDescripcion())
                .observaciones(e.getObservaciones())
                .lugar(e.getLugar())
                .duracionMinutos(e.getDuracionMinutos())
                .inicio(e.getInicio())
                .reglaRecurrencia(e.getReglaRecurrencia())
                .idCliente(e.getIdCliente())
                .tipo(e.getTipo())
                .build();
    }
}