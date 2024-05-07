package SpaceBox.dtos;

import SpaceBox.entidades.Tipo;
import lombok.* ;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Builder


public class EventoDTO {
    private Integer id ;
    private String nombre ;
    private String descripcion ;
    private String observaciones ;
    private String lugar ;
    private int duracionMinutos ;
    private String inicio ;
    private String reglaRecurrencia ;
    private Integer idCliente ;
    private Tipo tipo ;

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public void setDuracionMinutos(int duracionMinutos) {
        this.duracionMinutos = duracionMinutos;
    }

    public void setInicio(String inicio) {
        this.inicio = inicio;
    }

    public void setReglaRecurrencia(String reglaRecurrencia) {
        this.reglaRecurrencia = reglaRecurrencia;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public String getLugar() {
        return lugar;
    }

    public int getDuracionMinutos() {
        return duracionMinutos;
    }

    public String getInicio() {
        return inicio;
    }

    public String getReglaRecurrencia() {
        return reglaRecurrencia;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public Tipo getTipo() {
        return tipo ;
    }

    public Integer getId() {
        return id;
    }
}