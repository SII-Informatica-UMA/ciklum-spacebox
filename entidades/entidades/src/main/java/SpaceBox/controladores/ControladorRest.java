package SpaceBox.controladores;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import SpaceBox.dtos.EventoDTO;
import SpaceBox.dtos.EventoNuevoDTO;
import SpaceBox.entidades.Evento;
import SpaceBox.excepciones.EventoFallidoException;
import SpaceBox.excepciones.EventoNoAutorizadoException;
import SpaceBox.excepciones.EventoNoEncontradoException;
import SpaceBox.servicios.EventoService;

@RestController
@RequestMapping("/calendario")
public class ControladorRest {
    private EventoService service;

    public ControladorRest (EventoService es){
        this.service = es;
    }

    @GetMapping("{idEntrenador}/{idElemento}")
    public Evento getEventoById(@PathVariable(name="idEntrenador") Integer idEntrenador, @PathVariable(name="idElemento") Integer idElemento){
        return service.obtenerEvento(idEntrenador, idElemento) ;
    }

    @PutMapping("{idEntrenador}/{idElemento}")
    @ResponseStatus(HttpStatus.OK)
    public void updateEvento(@PathVariable(name="idElemento") Integer id, @PathVariable(name = "idEntrenador") Integer idEntrenador, @RequestBody EventoNuevoDTO even){
        service.actualizarEvento(id, idEntrenador, even);
    }

    @DeleteMapping("{idEntrenador}/{idElemento}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteEventoById(@PathVariable(name="idElemento") Integer id, @PathVariable(name = "idEntrenador") Integer idEntrenador) {
        service.eliminarEvento(id, idEntrenador);
    }

    @GetMapping("{idEntrenador}")
    public ResponseEntity<List<EventoDTO> > getEvento(@PathVariable(name = "idEntrenador") Integer idEntrenador){
        return ResponseEntity.ok(service.obtenerDisponibilidad(idEntrenador).stream()
                    .map(Mapper:: toEventoDTO)
                    .toList())   ; 
     }

    @PostMapping({"{idEntrenador}"})
    public ResponseEntity<Evento> addEvento(@PathVariable(name = "idEntrenador") Integer idEntrenador, @RequestBody EventoNuevoDTO en, UriComponentsBuilder builder){
        service.aniadirEvento(idEntrenador, en);

        URI uri =  builder
            .path("/calenderario")
            .path(String.format("%d", idEntrenador))
            .build()
            .toUri() ;

        return ResponseEntity.created(uri).build() ;
    }

    @ExceptionHandler({EventoNoEncontradoException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void eventoNoEncontrado(){}

    @ExceptionHandler({EventoFallidoException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void eventoFallido(){}

    @ExceptionHandler({EventoNoAutorizadoException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public void eventoNoAutorizado(){}
}
