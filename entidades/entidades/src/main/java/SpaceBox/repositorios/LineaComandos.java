package SpaceBox.repositorios;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import SpaceBox.entidades.Evento;

@Component
@SpringBootApplication
public class LineaComandos implements CommandLineRunner {
	private EventoRepository repository;
	public LineaComandos(EventoRepository repository) {
		this.repository = repository;
	}

	@Override
	@Transactional
	public void run(String... args) throws Exception {

		for (String s: args) {
			System.out.println(s);
		}

		if (args.length > 0) {
			for (Evento b: repository.findByNombreAndInicioAndIdCliente(args[0], args[1], Integer.parseInt(args[2]))) {
				System.out.println(b);
			}
		}
	}

}