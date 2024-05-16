package SpaceBox.dtos;

import SpaceBox.entidades.Tipo;
import lombok.* ;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString

public class EventoNuevoDTO {
    private String nombre ;
    private String descripcion ;
    private String observaciones ;
    private String lugar ;
    private int duracionMinutos ;
    private String inicio ;
    private String reglaRecurrencia ;
    private Integer idCliente ;
    private Tipo tipo ;
    private Integer idEntrenador;
}