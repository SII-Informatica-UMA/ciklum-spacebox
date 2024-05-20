package SpaceBox.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import SpaceBox.entidades.Evento  ;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
	List<Evento> findByNombreAndInicioAndIdCliente(String nombre, String inicio, int idCliente);
	List<Evento> findByInicio(String inicio) ;
	List<Evento> findByNombre(String nombre)  ;
	List<Evento> findByIdCliente(Integer idCliente) ;
	List<Evento>findByIdEntrenador(Integer idEntrenador) ;
}
