package SpaceBox.dtos;

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
public class EntrenadorDTO {
    private Integer idUsuario ;
    private String telefono ;
    private String direccion ;
    private String dni ;
    private String fechaNacimiento ;
    private String fechaAlta ;
    private String fechaBaja ;
    private String especialidad ;
    private String titulacion ;
    private String experiencia ;
    private String observacion ;
    private Integer id ;
}
