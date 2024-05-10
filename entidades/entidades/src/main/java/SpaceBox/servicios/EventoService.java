package SpaceBox.servicios;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SpaceBox.controladores.Mapper;
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

    public Evento obtenerEvento(Integer idEntrenador, Integer idElemento) {
        Evento e = new Evento() ;

        List<Evento> eventos = new ArrayList<>() ;
        boolean ok = false ;

        if (repo.findAll().isEmpty()) {
            throw new EventoNoEncontradoException();
        } else {
            eventos = repo.findAll() ;
            for (Evento evento : eventos) {
                if (evento.getIdEntrenador() == idEntrenador && evento.getId() == idElemento) {
                    ok = true ;
                    e = evento ;
                }
            }
            if (!ok) {
                throw new EventoFallidoException() ;
            }
        }
        return e ;
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

        List<Evento> eventos = new ArrayList<>()  ;
        List<Evento>  l = new ArrayList<>() ;
        
        boolean ok = false ;

        if (repo.findAll().isEmpty()) {
            throw new EventoNoEncontradoException();
        } else {
            eventos = repo.findAll() ;
            for (Evento evento : eventos) {
                if (evento.getIdEntrenador() == idEntrenador) {
                    ok = true ;
                    l.add(evento) ;
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
    public void aniadirEvento(Integer idEntrenador, EventoNuevoDTO eventoNuevo) {
        if(repo.findByIdEntrenador(idEntrenador) == null){
            throw new EventoFallidoException();
        }
        repo.save(Mapper.toEvento(eventoNuevo));
    }




}
