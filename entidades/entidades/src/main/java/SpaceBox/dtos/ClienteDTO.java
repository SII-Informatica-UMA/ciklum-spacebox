package SpaceBox.dtos;

import SpaceBox.entidades.Sexo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class ClienteDTO {
    private Integer idUsuario ;
    private String telefono ;
    private String direccion ;
    private String dni ;
    private String fechaNacimiento ;
    private Sexo sexo ;
    private Integer id ;
}
