package SpaceBox.excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Excepcion 400
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EventoFallidoException extends RuntimeException{
}
