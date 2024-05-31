package SpaceBox.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import SpaceBox.controladores.Mapper;
import SpaceBox.dtos.EventoNuevoDTO;
import SpaceBox.entidades.Evento;
import SpaceBox.excepciones.EventoFallidoException;
import SpaceBox.excepciones.EventoNoAutorizadoException;
import SpaceBox.excepciones.EventoNoEncontradoException;
import SpaceBox.repositorios.EventoRepository;
import SpaceBox.seguridad.SecurityConfguration;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;

@Service
@Transactional
public class EventoService {

    private EventoRepository repo;

//    @Autowired
//    private RestTemplate restTemplate;

//    @Autowired
//    private JwtUtil jwt ;

    public EventoService (EventoRepository rep){
        this.repo = rep;
    }

    public Evento obtenerEvento(Integer idEntrenador, Integer idElemento) {

        if(idEntrenador < 0 || idElemento < 0){
            throw new EventoFallidoException();
        }            
        
        Optional<UserDetails> usuario = SecurityConfguration.getAuthenticatedUser();

        if(usuario.isEmpty()) {
            throw new EventoNoAutorizadoException();
        }

        Optional<Evento> evento = repo.findById(idElemento);

        if(!evento.isPresent()){
            throw new EventoNoEncontradoException();
        } else {
            return evento.get();
        }
    }
    
    public void eliminarEvento(Integer id, Integer idEntrenador) {
        /*try {
            if(id < 0 || idEntrenador < 0){
                throw new EventoFallidoException();
            } else {

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
                    } else if (respuestaCliente.getBody().getId() == evento.get().getIdCliente()) {
                            repo.delete(evento.get());
                    } else {
                        throw new EventoNoAutorizadoException();
                    }                
                }
            }
        } catch (HttpClientErrorException e) {
            throw new EventoNoEncontradoException();
        }*/
        
        
        if(idEntrenador<0 || id<0) throw new EventoFallidoException();
        else if(repo.findByIdEntrenador(idEntrenador).isEmpty()) throw new EventoNoEncontradoException();
        else{            
            
            Optional<UserDetails> usuario = SecurityConfguration.getAuthenticatedUser();
            if(usuario.isEmpty()) throw new EventoNoAutorizadoException();

            Optional<Evento> e = repo.findById(id);

            if(e.isEmpty()) throw new EventoNoEncontradoException();
            else if(usuario.get().getUsername().compareTo(idEntrenador.toString()) != 0 ) throw new EventoNoAutorizadoException();
            else repo.delete(e.get());
            
        }
        
    }

    //Devuelve TRUE si el evento nuevo tiene IDs de entrenador o cliente mal formulados
    /* 
    private boolean comprobarEventoNuevo(EventoNuevoDTO eventoNuevo){
        return eventoNuevo.getIdCliente() < 0 || eventoNuevo.getIdEntrenador() < 0;
    }
    */
    public void actualizarEvento(Integer id, Integer idEntrenador, EventoNuevoDTO eventoNuevo) {
        
        Optional<UserDetails> usuario = SecurityConfguration.getAuthenticatedUser();

        if(eventoNuevo.getIdEntrenador() < 0 || id < 0 || idEntrenador < 0 || eventoNuevo.getIdCliente() < 0){
            throw new EventoFallidoException();
        } else if (usuario.isEmpty()) {
           throw new EventoNoAutorizadoException();
        } else {
            Optional<Evento> evento = repo.findById(id);

            if(evento.isEmpty()){
                throw new EventoNoEncontradoException();
            } else {

                evento.get().setNombre(eventoNuevo.getNombre());
                evento.get().setDescripcion(eventoNuevo.getDescripcion());
                evento.get().setObservaciones(eventoNuevo.getObservaciones());
                evento.get().setLugar(eventoNuevo.getLugar());
                evento.get().setDuracionMinutos(eventoNuevo.getDuracionMinutos());
                evento.get().setInicio(eventoNuevo.getInicio());
                evento.get().setReglaRecurrencia(eventoNuevo.getReglaRecurrencia());
                evento.get().setIdCliente(eventoNuevo.getIdCliente());
                evento.get().setTipo(eventoNuevo.getTipo());
                evento.get().setIdEntrenador(eventoNuevo.getIdEntrenador());

                repo.save(evento.get());
            }
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

        Optional<UserDetails> usuario = SecurityConfguration.getAuthenticatedUser();

        if(idEntrenador < 0){
            throw new EventoFallidoException();
        } else if (usuario.isEmpty()) {
             throw new EventoNoAutorizadoException();
        } else {
            if (repo.findByIdEntrenador(idEntrenador).isEmpty()) {
                throw new EventoNoEncontradoException();
            } else {
                return repo.findByIdEntrenador(idEntrenador);
            }
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
        if(idEntrenador < 0 || comprobarSolapamiento(idEntrenador, eventoNuevo) || 
        eventoNuevo.getIdCliente() < 0 || eventoNuevo.getIdEntrenador() < 0){
            throw new EventoFallidoException();
        }
        Optional<UserDetails> usuario = SecurityConfguration.getAuthenticatedUser();
        if(usuario.isEmpty()){
            throw new EventoNoAutorizadoException();
        } 
        
        if(usuario.get().getUsername().compareTo(idEntrenador.toString()) != 0 ){
            throw new EventoNoAutorizadoException();
        } else {
            repo.save(Mapper.toEvento(eventoNuevo));
        }  
    }

    private boolean comprobarSolapamiento(Integer idEntrenador, EventoNuevoDTO eventoNuevo) {
        List<Evento> eventos = repo.findByIdEntrenador(idEntrenador);
        boolean ok = false ;

        for (Evento evento : eventos) {
            if (evento.getInicio().equals(eventoNuevo.getInicio())) {
                ok = true;
            }
        }
        return ok ;
    }
}
