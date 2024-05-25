package SpaceBox.servicios;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import SpaceBox.controladores.Mapper;
import SpaceBox.dtos.ClienteDTO;
import SpaceBox.dtos.EntrenadorDTO;
import SpaceBox.dtos.EventoNuevoDTO;
import SpaceBox.entidades.Evento;
import SpaceBox.excepciones.EventoFallidoException;
import SpaceBox.excepciones.EventoNoAutorizadoException;
import SpaceBox.excepciones.EventoNoEncontradoException;
import SpaceBox.repositorios.EventoRepository;
import SpaceBox.seguridad.JwtUtil;
import SpaceBox.seguridad.SecurityConfguration;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class EventoService {

    private EventoRepository repo;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private JwtUtil jwt ;

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
        } else {
            return evento.get();
        }
    }
    
    public void eliminarEvento(Integer id, Integer idEntrenador) {
       try {
        if(id < 0 || idEntrenador < 0){
            throw new EventoFallidoException();
        }  else {

            Optional<Evento> evento = repo.findById(id);

            if (!evento.isPresent()) {
                throw new EventoNoEncontradoException();
            } else {
                String url = "http://localhost:8080/entrenador/" + idEntrenador ;
                HttpEntity<String> entity = new HttpEntity<>(new HttpHeaders());
                
                ResponseEntity<EntrenadorDTO> respuestaEntrenador = restTemplate.exchange(url, HttpMethod.GET, entity, EntrenadorDTO.class);
                ResponseEntity<ClienteDTO> respuestaCliente = restTemplate.exchange(url, HttpMethod.GET, entity, ClienteDTO.class);
    
                if (respuestaEntrenador.getBody().getId() == evento.get().getIdEntrenador()) {
                        repo.delete(evento.get());
                        return ;
                } else if (respuestaCliente.getBody().getId() == evento.get().getIdCliente()) {
                        repo.delete(evento.get());
                        return ;
                } else {
                    throw new EventoNoAutorizadoException();
                }                
            }
        }
       } catch (HttpClientErrorException e) {
              throw new EventoNoEncontradoException();
       }
    }

    //Devuelve TRUE si el evento nuevo tiene IDs de entrenador o cliente mal formulados
    private boolean comprobarEventoNuevo(EventoNuevoDTO eventoNuevo){
        return eventoNuevo.getIdCliente() < 0 || eventoNuevo.getIdEntrenador() < 0;
    }

    public void actualizarEvento(Integer id, Integer idEntrenador, EventoNuevoDTO eventoNuevo) {
        if(id < 0 || idEntrenador < 0 || comprobarEventoNuevo(eventoNuevo)){
            throw new EventoFallidoException();
        }

        Optional<Evento> evento = repo.findById(id);

        if(!evento.isPresent()){
            throw new EventoNoEncontradoException();
        }  else {
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
