package SpaceBox.controladores;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import SpaceBox.dtos.EventoNuevoDTO;
import SpaceBox.entidades.Evento;
import SpaceBox.servicios.EventoService;

@RestController
@RequestMapping("/calendario/{idEntrenador}")
public class ControladorRest {
    private EventoService service;

    public ControladorRest (EventoService es){
        this.service = es;
    }

    //Obtiene un evento concreto del calendario
    //FALTA ACCESO NO AUTORIZADO
    @GetMapping("{idElemento}")
    public ResponseEntity<Evento> getEventoById(@PathVariable(name="idElemento") Integer id){
        try {
            return ResponseEntity.of(service.getEventoById(id));
        } catch (IllegalArgumentException iae){
            return ResponseEntity.badRequest().build();
        }
        
    }

    @PutMapping("{idElemento}")
    public ResponseEntity<Evento> updateEvento(@PathVariable(name="idElemento") Integer id, @RequestBody Evento even){
        return null;
    }

    @DeleteMapping("{idElemento}")
    public ResponseEntity<Evento> deleteEventoById(@PathVariable(name="idElemento") Integer id){
        try {
            if(service.eliminarEvento(id)){
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("{idEntrenador}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<Evento> > addEvento(@PathVariable(name = "idEntrenador") Integer idEntrenador){

        return null ;

    }

    @PostMapping({"{idEntrenador}"})
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<Evento> getEventos(@PathVariable(name = "idEntrenador") Integer idEntrenador, @RequestBody EventoNuevoDTO en, UriComponentsBuilder builder){

        Evento e = Mapper.toEvento(en) ;

        service.aniadirEvento(idEntrenador, e) ;

        URI uri =  builder
            .path("/calenderario")
            .path(String.format("%d", idEntrenador))
            .build()
            .toUri() ;

        return ResponseEntity.created(uri).build() ;
    }
}
