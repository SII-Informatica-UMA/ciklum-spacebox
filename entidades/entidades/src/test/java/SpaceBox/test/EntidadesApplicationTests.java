package SpaceBox.test;

import SpaceBox.EntidadesApplication;
import SpaceBox.dtos.EventoDTO;
import SpaceBox.dtos.EventoNuevoDTO;
import SpaceBox.entidades.Evento;
//import SpaceBox.entidades.Evento;
import SpaceBox.entidades.Tipo;
import SpaceBox.repositorios.EventoRepository;
//import SpaceBox.dtos.EventoDTO;
//import SpaceBox.dtos.EventoNuevoDTO;
import SpaceBox.seguridad.JwtUtil;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;
import java.net.URI;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = EntidadesApplication.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class EntidadesApplicationTests {

	@Autowired
    private TestRestTemplate restTemplate;

    @Value(value = "${local.server.port}")
    private int port;
	
	@Autowired
	private EventoRepository eventoRepository;

	@Autowired
	private JwtUtil jwtUtil;
	private UserDetails userDetails;
	private String token;

	@BeforeEach
	public void inicializarBaseDeDatos() {
		eventoRepository.deleteAll();
		userDetails = jwtUtil.createUserDetails("1", "", List.of("ROLE_USER")) ;
		token = jwtUtil.generateToken(userDetails) ;
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
			.header("Authorization", "Bearer " + token)
            .build();
        return peticion;
    }

	private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.delete(uri)
			.header("Authorization", "Bearer " + token)
            .build();
        return peticion;
    }

	private <T> RequestEntity<T> post(String scheme, String host, int port, String path, T object) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.post(uri)
            .contentType(MediaType.APPLICATION_JSON)
			.header("Authorization", "Bearer " + token)
            .body(object);
        return peticion;
    }

	private <T> RequestEntity<T> put(String scheme, String host, int port, String path, T object) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.put(uri)
            .contentType(MediaType.APPLICATION_JSON)
			.header("Authorization", "Bearer " + token)
            .body(object);
        return peticion;
    }


	// ----------------------------------------- CLASE NO HAY EVENTOS EN LA BD
	@Nested
	@DisplayName("cuando no hay eventos")
	public class SinEventos {
		
		// ------------------------------------------------ GET /calendario/{idEntrenador}/{idEvento}

			@Nested
			public class obtenerEventosBdVacia {

				@Test
				@DisplayName("no se obtienen eventos porque no los hay")
				public void obtenerEventoNoExistente() {
					var peticion = get("http",  "localhost", port, "/calendario/1/10");
		
					var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<EventoDTO>() {});
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}

				@Test
				@DisplayName("no se obtienen eventos porque no los hay")
				public void obtenerEventoNoExisteEntrenador() {
					var peticion = get("http",  "localhost", port, "/calendario/10/1");
		
					var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<EventoDTO>() {});
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}

			}

			// ------------------------------------------------  PUT /calendario/{idEntrenador}/{idEvento}

			@Nested
			public class actualizarEventoBdVacia {

				@Test
				@DisplayName("se intenta modificar un evento que no existe")
				public void modificarEventoNoExistente(){
					var nuevoEvento = EventoNuevoDTO.builder()
						.idEntrenador(1)
						.idCliente(1)
						.descripcion("descripcion de evento 1")
						.build();
		
					var peticion = put("http", "localhost", port, "calendario/1/10", nuevoEvento);
		
					var respuesta = restTemplate.exchange(peticion, Void.class);
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}
		
				@Test
				@DisplayName("se intenta modificar evento y el entrenador no existe")
				public void modificarEventoNoExisteEntrenador(){
					var nuevoEvento = new EventoNuevoDTO("evento1", "descripcion de evento 1", "observaciones 1", "lugar 1", 1, "inicio 1", "regla de recurrencia 1", 1, Tipo.CITA, 1);
		
					var peticion = put("http", "localhost", port, "calendario/5/1", nuevoEvento);
		
					var respuesta = restTemplate.exchange(peticion, Void.class);
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}
		
			}

			// ------------------------------------------------ DELETE /calendario/{idEntrenador}/{idEvento}

			@Nested
			public class eliminarEventoBdVacia {

				@Test
				@DisplayName("se intenta borrar un evento que no existe")
				public void borrarEventoNoExistente(){
		
					var peticion = delete("http","localhost",port, "/calendario/1/5");
		
					var respuesta = restTemplate.exchange(peticion, Void.class);
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}
		
				@Test
				@DisplayName("se intenta borrar un evento para el que no existe el entrenador introducido")
				public void borrarEventoNoExisteEntrenador(){
		
					var peticion = delete("http","localhost",port, "/calendario/5/1");
		
					var respuesta = restTemplate.exchange(peticion, Void.class);
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}
			}

			// ------------------------------------------------ GET /calendario/{idEntrenador}

			@Nested
			public class obtenerDisponibilidadBdVacia {

				@Test
				@DisplayName("no se obtiene disponibilidad porque no existe el entrenador")
				public void  obtenerDisponibilidadNoExistente() {
					var peticion = get("http", "localhost", port, "/calendario/10") ;
		
					var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<EventoDTO>() {});
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}
			}

			// ------------------------------------------------ POST /calendario/{idEntrenador}

			@Nested
			public class crearEventoBdVacia {

				@Test
				@DisplayName("se crea evento correctamente")
				public void publicarEventoCorrecto(){
					var nuevoEvento = new EventoNuevoDTO("evento1", "descripcion de evento 1", "observaciones 1", "lugar 1", 1, "inicio 1", "regla de recurrencia 1", 1, Tipo.CITA, 1);
				
					var peticion = post("http", "localhost", port, "/calendario/1", nuevoEvento);
				
					var respuesta = restTemplate.exchange(peticion,Void.class);
				
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.CREATED);
				}

			}
	}









	

	@Nested
	@DisplayName("cuando hay eventos en la base de datos")
	public class ConEventos {

		@BeforeEach
		public void inicializarBaseDeDatosConEventos() {

			var Evento1 = new Evento("evento1", "descripcion de evento 1", "observaciones 1", "lugar 1", 1, "inicio 1", "regla de recurrencia 1", 1, 1, Tipo.CITA, 1);
			var Evento2 = new Evento("evento2", "descripcion de evento 2", "observaciones 2", "lugar 2", 2, "inicio 2", "regla de recurrencia 2", 1, 2, Tipo.CITA, 2);
			var Evento3 = new Evento("evento3", "descripcion de evento 3", "observaciones 3", "lugar 3", 3, "inicio 3", "regla de recurrencia 3", 2, 3, Tipo.CITA, 3);
			

			eventoRepository.save(Evento1);
			eventoRepository.save(Evento2);
			eventoRepository.save(Evento3);
		}
		//(String nombre, String descripcion, String observaciones, String lugar, int duracionMinutos, String inicio, String reglaRecurrencia, Integer idCliente, Integer idEntrenador, Tipo tipo,  int id)


		// ------------------------------------------------ GET /calendario/{idEntrenador}/{idEvento}
		
		@Nested
		public class obtenerEventosBdNoVacia {

			@Test
			@DisplayName("se obtiene un evento concreto del entrenador")
			public void obtenerEvento() {
				
				var peticion = get("http",  "localhost", port, "/calendario/1/1");
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<Evento>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
			}

			@Test
			@DisplayName("no se obtiene el evento porque no se esta autorizado")
			public void obtenerEventoNoAutorizado() {
				var peticion = get("http",  "localhost", port, "/calendario/5/1");
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<EventoDTO>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
			}
	
			@Test
			@DisplayName("no se obtiene el evento porque el id de entrenador es erroneo")
			public void obtenerEventoMalaPeticion1() {
				var peticion = get("http",  "localhost", port, "/calendario/-3/1");
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<EventoDTO>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			}
	
			@Test
			@DisplayName("no se obtiene el evento porque el id de entrenamientoes erroneo")
			public void obtenerEventoMalaPeticion2() {
				var peticion = get("http",  "localhost", port, "/calendario/1/-3");
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<EventoDTO>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			}
		}


		// ------------------------------------------------  PUT /calendario/{idEntrenador}/{idEvento}

		@Nested
		public class actualizarEventoBdNoVacia {

			private EventoNuevoDTO nuevoEvento;

			//@BeforeEach
			public void inicializarNuevoEvento(){
				nuevoEvento = new EventoNuevoDTO("evento1", "esta es la nueva descripcion del evento 1", "observaciones 1", "lugar 1", 1, "inicio 1", "regla de recurrencia 1", 10, Tipo.CITA, 1);
			}

			@Test
			@DisplayName("se modifica un evento correctamente")
			public void modificarEventoCorrectamente(){

				var nuevoEvento = EventoNuevoDTO.builder()
				.idEntrenador(1)
				.idCliente(1)
				.descripcion("esta es la nueva descripcion del evento 1")
				.build();

				var peticion = put("http","localhost",port,"calendario/1/1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("esta es la nueva descripcion del evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente()).isEqualTo(10);
			}

			@Test
			@DisplayName("se intenta modificar un evento con un id de entrandor mal formulado")
			public void modificarEventoIdEntrenadorErroneo(){
				nuevoEvento.setIdEntrenador(1);
				nuevoEvento.setIdCliente(10);
				nuevoEvento.setDescripcion("esta es la nueva descripcion del evento 1");

				var peticion = put("http","localhost",port,"calendario/-5/1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}

			@Test
			@DisplayName("se intenta modificar un evento con un id de evento mal formulado")
			public void modificarEventoIdEventoErroneo(){
				nuevoEvento.setIdEntrenador(1);
				nuevoEvento.setIdCliente(10);
				nuevoEvento.setDescripcion("esta es la nueva descripcion del evento 1");

				var peticion = put("http","localhost",port,"calendario/1/-1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}

			@Test
			@DisplayName("se intenta modificar el evento con un nuevo id de entrenador mal formado")
			public void modificarEventoIdEntrenadorNuevoEventoErroneo(){
				nuevoEvento.setIdEntrenador(-1);
				nuevoEvento.setIdCliente(10);
				nuevoEvento.setDescripcion("esta es la nueva descripcion del evento 1");

				var peticion = put("http","localhost",port,"calendario/1/1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}

			@Test
			@DisplayName("se intenta modificar el evento con un nuevo id de cliente mal formado")
			public void modificarEventoIdClienteNuevoEventoErroneo(){
				nuevoEvento.setIdEntrenador(1);
				nuevoEvento.setIdCliente(-10);
				nuevoEvento.setDescripcion("esta es la nueva descripcion del evento 1");

				var peticion = put("http","localhost",port,"calendario/1/1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}

			@Test
			@DisplayName("se intenta modificar un evento sobre el que no se tienen permisos")
			public void modificarEventoSinPermisos(){
				nuevoEvento.setIdEntrenador(1);
				nuevoEvento.setIdCliente(10);
				nuevoEvento.setDescripcion("esta es la nueva descripcion del evento 1");

				var peticion = put("http", "localhost", port, "calendario/14/2", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}
		}

		// ------------------------------------------------ DELETE /calendario/{idEntrenador}/{idEvento}

		@Nested
		public class eliminarEventoBdNoVacia {
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
			@DisplayName("se intenta borrar un evento con id mal formulado")
			public void borrarEventoMalId(){
				var peticion = delete("http","localhost",port, "calendario/1/-1");
	
				var respuesta = restTemplate.exchange(peticion, Void.class);
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.count()).isEqualTo(3);
			}
	
			@Test
			@DisplayName("se intenta borrar un evento con id de entrenador mal formulado")
			public void borrarEventoMalIdEntrenador(){
				var peticion = delete("http","localhost",port, "calendario/-1/1");
	
				var respuesta = restTemplate.exchange(peticion, Void.class);
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.count()).isEqualTo(3);
			}
	
			@Test
			@DisplayName("se intenta borrar un evento sobre el que no se tienen permisos")
			public void borrarEventoNoAutorizado(){
				var peticion = delete("http","localhost",port, "calendario/100/1");
	
				var respuesta = restTemplate.exchange(peticion, Void.class);
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
				assertThat(eventoRepository.count()).isEqualTo(3);
			}
		}

		// ------------------------------------------------ GET /calendario/{idEntrenador}

		@Nested
		public class obtenerDisponibilidadBdNoVacia {
			@Test
			@DisplayName("se obtiene disponibilidad del entrenadorr")
			public void  obtenerDisponibilidad() {
				var peticion = get("http", "localhost", port, "/calendario/1") ;
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<EventoDTO>>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
			}
	
			@Test
			@DisplayName("no se obtiene disponibilidad porque no existe el entrenador")
			public void  obtenerDisponibilidadMalaPeticion() {
				var peticion = get("http", "localhost", port, "/calendario/-3") ;
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<EventoDTO>>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			}
	
			@Test
			@DisplayName("no se obtiene disponibilidad porque no se tiene acceso")
			public void  obtenerDisponibilidadNoExistente() {
				var peticion = get("http", "localhost", port, "/calendario/1") ;
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<EventoDTO>>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
		}


		}

		// ------------------------------------------------ POST /calendario/{idEntrenador}

		@Nested
		public class crearEventoBdNoVacia {

		}
	}
}

/*
		@BeforeEach
		public void inicializarBaseDeDatos() {
			var Evento1 = new Evento();
			Evento1.setId(1);
			Evento1.setIdEntrenador(1);
			Evento1.setIdCliente(1);
			Evento1.setDescripcion("descripcion de evento 1");
			var Evento2 = new Evento();
			Evento2.setId(2);
			Evento2.setIdEntrenador(1);
			Evento2.setIdCliente(2);
			Evento2.setDescripcion("descripcion de evento 2");
			var Evento3 = new Evento();
			Evento3.setId(3);
			Evento3.setIdEntrenador(2);
			Evento3.setIdCliente(3);
			Evento3.setDescripcion("descripcion de evento 3");
			
			eventoRepository.save(Evento1);
			eventoRepository.save(Evento2);
			eventoRepository.save(Evento3);

		}
 */