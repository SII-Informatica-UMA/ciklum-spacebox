package SpaceBox.excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Excepcion 403
@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class EventoNoAutorizadoException extends RuntimeException{
    
}
