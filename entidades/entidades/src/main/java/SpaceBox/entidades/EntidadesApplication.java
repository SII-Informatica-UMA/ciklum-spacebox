package SpaceBox.entidades;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.persistence.EntityManagerFactory;

@SpringBootApplication
public class EntidadesApplication implements CommandLineRunner{

	@Autowired
	private EntityManagerFactory emf;

	public static void main(String[] args) {
		SpringApplication.run(EntidadesApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
	}

}
