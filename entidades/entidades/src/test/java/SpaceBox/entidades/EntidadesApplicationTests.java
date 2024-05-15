package SpaceBox.entidades;

import SpaceBox.entidades.Evento;
import SpaceBox.entidades.Tipo;
import SpaceBox.repositorios.EventoRepository;
import SpaceBox.dtos.EventoDTO;
import SpaceBox.dtos.EventoNuevoDTO;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;

import java.net.URI;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class EntidadesApplicationTests {

	@Autowired
    private TestRestTemplate restTemplate;

    @Value(value = "${local.server.port}")
    private int port;

	@Autowired
	private EventoRepository eventoRepository;

	@BeforeEach
	public void inicializarBaseDeDatos() {
		eventoRepository.deleteAll();
	}

	 private URI uri(String scheme, String host, int port, String... paths) {
    	UriBuilderFactory ubf = new DefaultUriBuilderFactory();
        UriBuilder ub = ubf.builder()
            .scheme(scheme)
            .host(host).port(port);
        for (String path : paths) {
            ub = ub.path(path);
        }
        return ub.build();
    }

	private RequestEntity<Void> get(String scheme, String host, int port, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.get(uri)
            .accept(MediaType.APPLICATION_JSON)
            .build();
        return peticion;
    }

	private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.delete(uri)
            .build();
        return peticion;
    }

	private <T> RequestEntity<T> post(String scheme, String host, int port, String path, T object) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.post(uri)
            .contentType(MediaType.APPLICATION_JSON)
            .body(object);
        return peticion;
    }

	private <T> RequestEntity<T> put(String scheme, String host, int port, String path, T object) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.put(uri)
            .contentType(MediaType.APPLICATION_JSON)
            .body(object);
        return peticion;
    }

	@Nested
	@DisplayName("cuando no hay eventos")
	public class SinEventos {
		
		@Test
		@DisplayName("no se obtienen eventos porque no los hay")
		public void obtenerEventoNoExistente() {
			var peticion = get("http",  "localhost", port, "/calendario/1/1");

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
		}

		@Test
		@DisplayName("no se obtiene disponibilidad porque no existe el entrenador")
		public void  obtenerDisponibilidadNoExistente() {
			var peticion = get("http", "localhost", port, "/calendario/1") ;

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
		}

	}
	// --------------------------------------------------------------------------------------------------------------------

	@Nested
	@DisplayName("cuando hay eventos en la base de datos")
	public class ConEventos {

		@BeforeEach
		public void inicializarBaseDeDatos() {
			var Evento1 = new Evento();
			Evento1.setIdEntrenador(1);
			var Evento2 = new Evento();
			Evento2.setIdEntrenador(1);
			var Evento3 = new Evento();
			Evento3.setIdEntrenador(2);
			
			eventoRepository.save(Evento1);
			eventoRepository.save(Evento2);
			eventoRepository.save(Evento3);

		}

		@Test
		@DisplayName("se obtiene un evento concreto del entrenador")
		public void obtenerEvento() {
			var peticion = get("http",  "localhost", port, "/calendario/1/1");

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
		}

		@Test
		@DisplayName("no se obtiene el evento porque no se esta autorizado")
		public void obtenerEventoNoAutorizado() {
			var peticion = get("http",  "localhost", port, "/calendario/1/1");

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
		}

		@Test
		@DisplayName("no se obtiene el evento porque el id de entrenador es erroneo")
		public void obtenerEventoMalaPeticion1() {
			var peticion = get("http",  "localhost", port, "/calendario/3/1");

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
		}

		@Test
		@DisplayName("no se obtiene el evento porque el id de entrenamientoes erroneo")
		public void obtenerEventoMalaPeticion2() {
			var peticion = get("http",  "localhost", port, "/calendario/1/3");

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
		}

		@Test
		@DisplayName("se obtiene disponibilidad del entrenadorr")
		public void  obtenerDisponibilidad() {
			var peticion = get("http", "localhost", port, "/calendario/1") ;

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
		}

		@Test
		@DisplayName("no se obtiene disponibilidad porque no existe el entrenador")
		public void  obtenerDisponibilidadMalaPeticion() {
			var peticion = get("http", "localhost", port, "/calendario/3") ;

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
		}

		@Test
		@DisplayName("no se obtiene disponibilidad porque no se tiene acceso")
		public void  obtenerDisponibilidadNoExistente() {
			var peticion = get("http", "localhost", port, "/calendario/1") ;

			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Evento>>() {});

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
		}

		@Test
		@DisplayName("se borra correctamente un evento")
		public void borrarEventoCorrecto(){
			var peticion = delete("http","localhost",port, "calendario/1/1");

			var respuesta = restTemplate.exchange(peticion, Void.class);

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
			assertThat(eventoRepository.count()).isEqualTo(2);
			assertThat(eventoRepository.findById(1)).isEmpty();
		}

		@Test
		@DisplayName("se intenta borrar un evento que no existe")
		public void borrarEventoNoExistente(){
			var peticion = delete("http","localhost",port, "calendario/1/13");

			var respuesta = restTemplate.exchange(peticion, Void.class);

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
			assertThat(eventoRepository.count()).isEqualTo(3);
		}

		@Test
		@DisplayName("se intenta borrar un evento con id mal formulado")
		public void borrarEventoMalId(){
			var peticion = delete("http","localhost",port, "calendario/1/-1");

			var respuesta = restTemplate.exchange(peticion, Void.class);

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			assertThat(eventoRepository.count()).isEqualTo(3);
		}

		@Test
		@DisplayName("se intenta borrar un evento sobre el que no se tienen permisos")
		public void borrarEventoNoAutorizado(){
			var peticion = delete("http","localhost",port, "calendario/100/-1");

			var respuesta = restTemplate.exchange(peticion, Void.class);

			assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
			assertThat(eventoRepository.count()).isEqualTo(3);
		}
	}
}
