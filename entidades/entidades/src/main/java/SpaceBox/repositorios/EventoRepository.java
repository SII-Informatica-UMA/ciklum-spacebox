package SpaceBox.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import SpaceBox.entidades.Evento  ;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
	List<Evento> findByNombreInicioAndIdCliente(String nombre, String inicio, int idCliente);
	List<Evento> findByInicio(String inicio) ;
}
