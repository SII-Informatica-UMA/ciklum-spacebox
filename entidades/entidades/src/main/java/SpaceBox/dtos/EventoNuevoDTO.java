
import lombok.* ;

@Getter
@Setter
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString

public class EventoNuevoDTO {
    private Integer id ;
    private String nombre ;
    private String descripcion ;
    private String observaciones ;
    private String lugar ;
    private int duracionMinutos ;
    private String inicio ;
    private String reglaRecurrencia ;
    private Integer idCliente ;
    private enum Tipo { DISPONIBILIDAD, CITA }
    private Tipo tipo ;
}