package SpaceBox.excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Excepcion 404
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class EventoNoEncontradoException extends RuntimeException{
    
}
