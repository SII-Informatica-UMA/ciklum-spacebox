package SpaceBox.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SpaceBox.controladores.Mapper;
import SpaceBox.dtos.EventoNuevoDTO;
import SpaceBox.entidades.Evento;
import SpaceBox.excepciones.EventoFallidoException;
import SpaceBox.excepciones.EventoNoAutorizadoException;
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
        if(idEntrenador < 0 || idElemento < 0){
            throw new EventoFallidoException();
        }

        Optional<Evento> evento = repo.findById(idElemento);

        if(!evento.isPresent()){
            throw new EventoNoEncontradoException();
        } else if(evento.get().getIdEntrenador() != idEntrenador){
            throw new EventoNoAutorizadoException();
        } else {
            return evento.get();
        }
    }
    
    public void eliminarEvento(Integer id) {
        if(id > 0){
            if(repo.existsById(id)){
                repo.deleteById(id);
            } else {
                throw new EventoNoEncontradoException();
            }
        } else {
            throw new EventoFallidoException();
        }
    }

    public void actualizarEvento(Integer id, Integer idEntrenador, EventoNuevoDTO eventoNuevo) {
        if(id < 0 || idEntrenador < 0){
            throw new EventoFallidoException();
        }

        Optional<Evento> evento = repo.findById(id);

        if(!evento.isPresent()){
            throw new EventoNoEncontradoException();
        } else if (evento.get().getIdEntrenador() != idEntrenador){
            throw new EventoNoAutorizadoException();
        } else {
            repo.save(Mapper.toEvento(eventoNuevo));
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

        if(idEntrenador < 0){
            throw new EventoFallidoException();
        }
        
        if (repo.findByIdEntrenador(idEntrenador).isEmpty()) {
            throw new EventoNoEncontradoException();
        } else {
            return repo.findByIdEntrenador(idEntrenador);
        }
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
        if(idEntrenador < 0){
            throw new EventoFallidoException();
        }

        if(repo.findByIdEntrenador(idEntrenador) == null){
            throw new EventoNoEncontradoException();
        }

        repo.save(Mapper.toEvento(eventoNuevo));
    }




}
