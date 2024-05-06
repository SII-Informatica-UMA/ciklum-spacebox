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

    private void setNombre(String nombre) {
        this.nombre = nombre;
    }

    private void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    private void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    private void setLugar(String lugar) {
        this.lugar = lugar;
    }

    private void setDuracionMinutos(int duracionMinutos) {
        this.duracionMinutos = duracionMinutos;
    }

    private void setInicio(String inicio) {
        this.inicio = inicio;
    }

    private void setReglaRecurrencia(String reglaRecurrencia) {
        this.reglaRecurrencia = reglaRecurrencia;
    }

    private void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    private void setTipo(Tipo tipo) {
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