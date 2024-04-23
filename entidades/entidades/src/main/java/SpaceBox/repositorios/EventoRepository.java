package SpaceBox.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import SpaceBox.entidades.Evento  ;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
	Evento findByNombreInicioAndIdCliente(String nombre, String inicio, int idCliente);
	Evento findByInicio(String inicio) ;
}
