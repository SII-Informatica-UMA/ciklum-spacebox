package SpaceBox.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SpaceBox.dtos.EventoNuevoDTO;
import SpaceBox.entidades.Evento;
import SpaceBox.excepciones.EventoFallidoException;
import SpaceBox.excepciones.EventoNoEncontradoException;
import SpaceBox.repositorios.EventoRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class EventoService {
    @Autowired
    private EventoRepository repo;

    @Autowired 
    public EventoService (EventoRepository rep){
        this.repo = rep;
    }

    public Optional<Evento> getEventoById(Integer id) throws IllegalArgumentException{
        return repo.findById(id);
    }

    
    public void eliminarEvento(Integer id) throws IllegalArgumentException {
        if(repo.existsById(id)){
            repo.deleteById(id);
        } else {
            throw new EventoNoEncontradoException();
        }
    }

    public void actualizarEvento(Evento evento) throws IllegalArgumentException{
       if(repo.existsById(evento.getId())){
            repo.save(evento);
       } else {
            throw new EventoNoEncontradoException();
       }
        
    }

    // Metodo asociado al GET /calendario/{idEntrenador}
    // Objetivo: Consultar disponibilidad de un entrenador
    // Resultados:
    // - 200: Devuelve la lista con la disponibilidad del entrenador
    // - 400: Bad request (no se ha encontrado a un entrenador)
    // - 403: Acceso no autorizado
    // - 404: No se ha encontrado eventos de esas caracteristicas
    public List<Evento> obtenerDisponibilidad(Integer idEntrenador) {

        List<Evento> l = null ;
        boolean ok = false ;

        if (repo.findAll().isEmpty()) {
            throw new EventoNoEncontradoException();
        } else {
            l = repo.findAll() ;
            for (Evento evento : l) {
                if (evento.getIdEntrenador() == idEntrenador) {
                    ok = true ;
                }
            }
            if (!ok) {
                throw new EventoFallidoException() ;
            }
        }
         return l;
    }

    // Metodo asociado al POST /calendario/{idEntrenador}
    // Objetivo: Crear un evento en el calendario de un entrenador. Lo puede hacer tanto un cliente como un entrenador. 
    //                   El entrenador puede añadir franjas de disponibilidad
    // Resultados:
    // - 201: Se ha creado el evento
    // - 400: Problemas en los parametros de entrada o solapamiento de alguna cita previa
    // - 403: Acceso no autorizado
    // - 404: No se ha encontrado el entrenador
    public void aniadirEvento(Integer idEntrenador, EventoNuevoDTO e) {
        
    }


}
