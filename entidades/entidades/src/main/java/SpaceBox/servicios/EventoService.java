package SpaceBox.servicios;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SpaceBox.entidades.Evento;
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

    public Optional<Evento> getEventoById(Integer id) throws IllegalArgumentException{
        return repo.findById(id);
    }
}
