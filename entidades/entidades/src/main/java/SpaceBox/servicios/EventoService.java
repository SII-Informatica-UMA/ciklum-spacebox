package SpaceBox.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SpaceBox.entidades.Evento;
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

    
    public Boolean eliminarEvento(Integer id) throws IllegalArgumentException {
        EventoRepository aux = repo;

        //deleteById no hace nada si no existe un Evento con el id especificado
        repo.deleteById(id);

        if(aux.findAll().size() == repo.findAll().size()){
            //Quiere decir que no se ha borrado el elemento porque éste no existía
            return false;
        } else {
            return true;
        }
    }

    // Metodo asociado al GET /calendario/{idEntrenador}
    // Objetivo: Consultar disponibilidad de un entrenador
    // Resultados:
    // - 200: Devuelve la lista con la disponibilidad del entrenador
    // - 400: Bad request (no se ha encontrado a un entrenador)
    // - 403: Acceso no autorizado
    // - 404: No se ha encontrado eventos de esas caracteristicas
    public List<Evento>  obtenerDisponibilidad(Integer idEntrenador) {

        List<Evento> l = repo.findAll();

        if (l.isEmpty()) {
            throw new EventoNoEncontradoException() ; 
        } else {
            
        }

         return l  ;
    }

    // Metodo asociado al POST /calendario/{idEntrenador}
    // Objetivo: Crear un evento en el calendario de un entrenador. Lo puede hacer tanto un cliente como un entrenador. 
    //                   El entrenador puede añadir franjas de disponibilidad
    // Resultados:
    // - 201: Se ha creado el evento
    // - 400: Problemas en los parametros de entrada o solapamiento de alguna cita previa
    // - 403: Acceso no autorizado
    // - 404: No se ha encontrado el entrenador
    public void aniadirEvento(Integer idEntrenador, Evento e) {
        
    }
}
