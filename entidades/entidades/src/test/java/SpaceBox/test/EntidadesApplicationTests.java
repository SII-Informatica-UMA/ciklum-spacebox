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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;
import java.net.URI;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = EntidadesApplication.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@DisplayName("Pruebas de eventos ")
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
			@DisplayName("se intenta obtener un evento ")
			public class obtenerEventosBdVacia {

				@Test
				@DisplayName("y no se obtienen porque no los hay")
				public void obtenerEventoNoExistente() {

					HttpHeaders headers = new HttpHeaders();
					headers.add("Authorization", "Bearer " + token);
	
					HttpEntity<Void> entity = new HttpEntity<>(headers);
		
					var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/1/10", org.springframework.http.HttpMethod.GET, entity, new ParameterizedTypeReference<EventoDTO>() {});
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}

				@Test
				@DisplayName("y no se obtienen porque no los hay")
				public void obtenerEventoNoExisteEntrenador() {
					HttpHeaders headers = new HttpHeaders();
					headers.add("Authorization", "Bearer " + token);
	
					HttpEntity<Void> entity = new HttpEntity<>(headers);
		
					var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/10/1", org.springframework.http.HttpMethod.GET, entity, new ParameterizedTypeReference<EventoDTO>() {});
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}

			}

			// ------------------------------------------------  PUT /calendario/{idEntrenador}/{idEvento}

			@Nested
			@DisplayName("se intenta modificar un evento ")
			public class actualizarEventoBdVacia {

				@Test
				@DisplayName("y no se modifica nada porque no existe")
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
				@DisplayName("y el entrenador no existe")
				public void modificarEventoNoExisteEntrenador(){
					var nuevoEvento = new EventoNuevoDTO("evento1", "descripcion de evento 1", "observaciones 1", "lugar 1", 1, "inicio 1", "regla de recurrencia 1", 1, Tipo.CITA, 1);
		
					var peticion = put("http", "localhost", port, "calendario/5/1", nuevoEvento);
		
					var respuesta = restTemplate.exchange(peticion, Void.class);
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}
		
			}

			// ------------------------------------------------ DELETE /calendario/{idEntrenador}/{idEvento}

			@Nested
			@DisplayName("se intenta borrar un evento ")
			public class eliminarEventoBdVacia {

				@Test
				@DisplayName("y no se borra nada porque no existe")
				public void borrarEventoNoExistente(){
		
					HttpHeaders headers = new HttpHeaders();
					headers.add("Authorization", "Bearer " + token);
	
					HttpEntity<Void> entity = new HttpEntity<>(headers);
		
					var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/1/5", org.springframework.http.HttpMethod.DELETE, entity, Void.class);
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
					assertThat(eventoRepository.count()).isEqualTo(0);
				}
		
				@Test
				@DisplayName("y no se borra nada porque no existe el entrenador introducido")
				public void borrarEventoNoExisteEntrenador(){
		
					HttpHeaders headers = new HttpHeaders();
					headers.add("Authorization", "Bearer " + token);
	
					HttpEntity<Void> entity = new HttpEntity<>(headers);
		
					var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/5/1", org.springframework.http.HttpMethod.DELETE, entity, Void.class);
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}
			}

			// ------------------------------------------------ GET /calendario/{idEntrenador}

			@Nested
			@DisplayName("se intenta obtener disponibilidad de un entranador ")
			public class obtenerDisponibilidadBdVacia {

				@Test
				@DisplayName("y no se obtiene porque no existe el entrenador")
				public void  obtenerDisponibilidadNoExistente() {
					var peticion = get("http", "localhost", port, "/calendario/10") ;
		
					var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<EventoDTO>() {});
		
					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
				}
			}

			// ------------------------------------------------ POST /calendario/{idEntrenador}

			@Nested
			@DisplayName("se inserta un evento con la BD vacia")
			public class crearEventoBdVacia {
				@Test
				@DisplayName("y se inserta correctamente")
				public void insertarEventoBDVacia() {
					
					var nuevoEvento = EventoNuevoDTO.builder()
						.idEntrenador(1)
						.idCliente(1)
						.descripcion("esta es la descripcion del evento 1")
						.build();

					
					HttpHeaders headers = new HttpHeaders();
					headers.add("Authorization", "Bearer " + token);

					HttpEntity<EventoNuevoDTO> entity = new HttpEntity<>(nuevoEvento, headers);
					var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/1", 
					org.springframework.http.HttpMethod.POST, entity, Void.class);

					assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
					assertThat(eventoRepository.count()).isEqualTo(1);
					assertThat(eventoRepository.findByIdEntrenador(1).get(0).getDescripcion())
						.isEqualTo("esta es la descripcion del evento 1");
				}
				
			}
	}

	@Nested
	@DisplayName("cuando hay eventos en la base de datos")
	public class ConEventos {

		private Evento Evento1 = new Evento("evento1", "descripcion de evento 1", "observaciones 1", "lugar 1", 1, "inicio 1", "regla de recurrencia 1", 1, 1, Tipo.CITA, 1);
		private Evento Evento2 = new Evento("evento2", "descripcion de evento 2", "observaciones 2", "lugar 2", 2, "inicio 2", "regla de recurrencia 2", 1, 2, Tipo.CITA, 2);
		private Evento Evento3 = new Evento("evento3", "descripcion de evento 3", "observaciones 3", "lugar 3", 3, "inicio 3", "regla de recurrencia 3", 2, 3, Tipo.CITA, 3);

		@BeforeEach
		public void inicializarBaseDeDatosConEventos() {

			eventoRepository.save(Evento1);
			eventoRepository.save(Evento2);
			eventoRepository.save(Evento3);
		}
		//(String nombre, String descripcion, String observaciones, String lugar, int duracionMinutos, String inicio, String reglaRecurrencia, Integer idCliente, Integer idEntrenador, Tipo tipo,  int id)


		// ------------------------------------------------ GET /calendario/{idEntrenador}/{idEvento}
		
		@Nested
		@DisplayName("se intenta obtener un evento ")
		public class obtenerEventosBdNoVacia {

			@SuppressWarnings("null")
			@Test
			@DisplayName("y se obtiene un evento concreto del entrenador")
			public void obtenerEvento() {
				
				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);

				HttpEntity<Void> entity = new HttpEntity<>(headers);
	
				var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/1/1", org.springframework.http.HttpMethod.GET, entity, new ParameterizedTypeReference<EventoDTO>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
				assertThat(respuesta.getBody().equals(Evento1)) ;
			}
	
			@Test
			@DisplayName("y no se obtiene el evento porque el id de entrenador es erroneo")
			public void obtenerEventoMalaPeticion1() {
				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);

				HttpEntity<Void> entity = new HttpEntity<>(headers);
	
				var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/-1/1", org.springframework.http.HttpMethod.GET, entity, new ParameterizedTypeReference<EventoDTO>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			}
	
			@Test
			@DisplayName("y no se obtiene el evento porque el id del evento es erroneo")
			public void obtenerEventoMalaPeticion2() {
				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);

				HttpEntity<Void> entity = new HttpEntity<>(headers);
	
				var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/1/-1", org.springframework.http.HttpMethod.GET, entity, new ParameterizedTypeReference<EventoDTO>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			}

			@Test
			@DisplayName("y no se obtiene el evento porque no se ha autenticado")
			public void obtenerEventoNoAutenticado() {
				var peticion = get("http",  "localhost", port, "/calendario/2/1");
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<EventoDTO>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
			}
		}


		// ------------------------------------------------  PUT /calendario/{idEntrenador}/{idEvento}

		@Nested
		@DisplayName("se intenta actualizar un evento ")
		public class actualizarEventoBdNoVacia {

			@Test
			@DisplayName("y se modifica correctamente")
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
			@DisplayName("y no se modifica porque el id de entrenador del evento esta mal formulado")
			public void modificarEventoIdEntrenadorErroneo(){
				
				var nuevoEvento = EventoNuevoDTO.builder()
				.idEntrenador(1)
				.idCliente(1)
				.descripcion("esta es la nueva descripcion del evento 1")
				.build();

				var peticion = put("http","localhost",port,"calendario/-1/1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}

			@Test
			@DisplayName("y no se modifica porque el id del evento esta mal formulado")
			public void modificarEventoIdEventoErroneo(){
				var nuevoEvento = EventoNuevoDTO.builder()
				.idEntrenador(1)
				.idCliente(1)
				.descripcion("esta es la nueva descripcion del evento 1")
				.build();

				var peticion = put("http","localhost",port,"calendario/1/-1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}

			@Test
			@DisplayName("y no se modifica porque el nuevo id de entrenador esta mal formado")
			public void modificarEventoIdEntrenadorNuevoEventoErroneo(){
				var nuevoEvento = EventoNuevoDTO.builder()
				.idEntrenador(-1)
				.idCliente(1)
				.descripcion("esta es la nueva descripcion del evento 1")
				.build();

				var peticion = put("http","localhost",port,"calendario/1/1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}

			@Test
			@DisplayName("y no se modifica porque el nuevo id de cliente esta mal formado")
			public void modificarEventoIdClienteNuevoEventoErroneo(){
				var nuevoEvento = EventoNuevoDTO.builder()
				.idEntrenador(1)
				.idCliente(-1)
				.descripcion("esta es la nueva descripcion del evento 1")
				.build();

				var peticion = put("http","localhost",port,"calendario/1/1", nuevoEvento);

				var respuesta = restTemplate.exchange(peticion, Void.class);

				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.findById(1).get().getDescripcion())
				.isEqualTo("descripcion de evento 1");
				assertThat(eventoRepository.findById(1).get().getIdCliente())
				.isEqualTo(1);
			}

			@Test
			@DisplayName("y no se modifica porque no se tienen permisos")
			public void modificarEventoSinPermisos(){
				var nuevoEvento = EventoNuevoDTO.builder()
				.idEntrenador(1)
				.idCliente(1)
				.descripcion("esta es la nueva descripcion del evento 1")
				.build();

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
		@DisplayName("se intenta eliminar un evento ")
		public class eliminarEventoBdNoVacia {
			@Test
			@DisplayName("y se borra correctamente")
			public void borrarEventoCorrecto(){
				//var peticion = delete("http","localhost",port, "calendario/1/1");

				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);

				HttpEntity<Void> entity = new HttpEntity<>(headers);
	
				var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/1/1", org.springframework.http.HttpMethod.DELETE, entity, Void.class);
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
				assertThat(eventoRepository.count()).isEqualTo(2);
				assertThat(eventoRepository.findById(1)).isEmpty();
			}
	
			@Test
			@DisplayName("y no se borra porque el id esta mal formulado")
			public void borrarEventoMalId(){

				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);

				HttpEntity<Void> entity = new HttpEntity<>(headers);
	
				var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/1/-1", org.springframework.http.HttpMethod.DELETE, entity, Void.class);
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.count()).isEqualTo(3);
			}
	
			@Test
			@DisplayName("y no se borra porque el id de entrenador esta mal formulado")
			public void borrarEventoMalIdEntrenador(){

				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);

				HttpEntity<Void> entity = new HttpEntity<>(headers);
	
				var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/-1/1", org.springframework.http.HttpMethod.DELETE, entity, Void.class);
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
				assertThat(eventoRepository.count()).isEqualTo(3);
			}
	
			@Test
			@DisplayName("y no se borra porque se intenta borrar un evento sobre el que no se tienen permisos")
			public void borrarEventoNoAutorizado(){
				var peticion = delete("http","localhost",port, "calendario/2/1");
	
				var respuesta = restTemplate.exchange(peticion, Void.class);
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
				assertThat(eventoRepository.count()).isEqualTo(3);
			}
		}

		// ------------------------------------------------ GET /calendario/{idEntrenador}

		@Nested
		@DisplayName("se intenta obtener la disponibilidad de un entrenador ")
		public class obtenerDisponibilidadBdNoVacia {
			@Test
			@DisplayName("y se obtiene correctamente")
			public void  obtenerDisponibilidad() {
				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);

				HttpEntity<Void> entity = new HttpEntity<>(headers);
	
				var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/1", org.springframework.http.HttpMethod.GET, entity, new ParameterizedTypeReference<List<EventoDTO>>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.OK);
			}
	
			@Test
			@DisplayName("y no se obtiene porque no existe el entrenador")
			public void  obtenerDisponibilidadMalaPeticion() {
				HttpHeaders headers = new HttpHeaders();
				headers.add("Authorization", "Bearer " + token);

				HttpEntity<Void> entity = new HttpEntity<>(headers);
	
				var respuesta = restTemplate.exchange("http://localhost:" + port + "/calendario/-1", org.springframework.http.HttpMethod.GET, entity, new ParameterizedTypeReference<List<EventoDTO>>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			}

			@Test
			@DisplayName("no se obtiene disponibilidad porque el usuario no se ha autenticado")
			public void  obtenerDisponibilidadNoAutenticado() {
				var peticion = get("http", "localhost", port, "/calendario/1") ;
	
				var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<EventoDTO>>() {});
	
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
			}


		}

		// ------------------------------------------------ POST /calendario/{idEntrenador}

		@Nested
		@DisplayName("se intenta crear un nuevo evento ")
		public class crearEventoBdNoVacia {

			@Test
			@DisplayName("y se crea correctamente")
			public void publicarEventoCorrecto(){
				var nuevoEvento = new EventoNuevoDTO("evento5", "descripcion de evento 5", "observaciones 5", "lugar 5", 1, "inicio 5", "regla de recurrencia 5", 15, Tipo.CITA, 1);
			
				var peticion = post("http", "localhost", port, "/calendario/1", nuevoEvento);
			
				var respuesta = restTemplate.exchange(peticion,Void.class);
			
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.CREATED);
				assertThat(eventoRepository.count()).isEqualTo(4);
				assertThat(eventoRepository.findByIdCliente(15).get(0).getNombre()).isEqualTo("evento5");

			}
			
			@Test
			@DisplayName("y no se crea porque los datos introducidos son erroneos")
			public void publicarEventoDatosIncorrectos(){
				var nuevoEvento = new EventoNuevoDTO("evento1", "descripcion de evento 1", "observaciones 1", "lugar 1", 1, "inicio 1", "regla de recurrencia 1", 15, Tipo.CITA, 1);
			
				var peticion = post("http", "localhost", port, "/calendario/-1", nuevoEvento);
			
				var respuesta = restTemplate.exchange(peticion,Void.class);
			
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			}

			@Test
			@DisplayName("y nos se crea porque hay solapamientos")
			public void publicarEventoSolapamiento(){
				var nuevoEvento = new EventoNuevoDTO("evento1", "descripcion de evento 1", "observaciones 1", "lugar 1", 1, "inicio 1", "regla de recurrencia 1", 1, Tipo.CITA, 1);
			
				var peticion = post("http", "localhost", port, "/calendario/1", nuevoEvento);
			
				var respuesta = restTemplate.exchange(peticion,Void.class);
			
				assertThat(respuesta.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
			}
		}
	}
}