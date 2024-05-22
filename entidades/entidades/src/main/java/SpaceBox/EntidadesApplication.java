package SpaceBox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "SpaceBox.repositorios")
public class EntidadesApplication {
    public static void main(String[] args) {
        SpringApplication.run(EntidadesApplication.class, args);
    }
}
