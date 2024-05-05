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

    
    public Boolean eliminarEvento(Integer id) throws IllegalArgumentException {
        EventoRepository aux = repo;

        //deleteById no hace nada si no existe un Evento con el id especificado
        repo.deleteById(id);

        if(aux.findAll().size() == repo.findAll().size()){
            //Quiere decir que no se ha borrado el elemento porque éste no existía
            return false;
        } else {
            return true;
        }
    }

    // Metodo asociado al POST /calendario/{idEntrenador}
    public void aniadirEvento(Integer idEntrenador, Evento e) {
        if (repo.findById(e.getId()).isEmpty()) {
            
        }
        
    }
}
