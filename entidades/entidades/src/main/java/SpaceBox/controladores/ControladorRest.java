package SpaceBox.controladores;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
