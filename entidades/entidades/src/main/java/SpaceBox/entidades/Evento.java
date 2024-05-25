package SpaceBox.entidades;

import org.springframework.context.annotation.ComponentScan;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.* ;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@ComponentScan(basePackages = "SpaceBox")
public class Evento  {
    @Id @GeneratedValue(strategy = jakarta.persistence.GenerationType.SEQUENCE)
    private Integer id ;
    @Column(nullable = false)
    private String nombre ;
    @Column()
    private String descripcion	;
    @Column()
    private String observaciones ;
    @Column(nullable = false)
    private String lugar  ;
    @Column(nullable = false)
    private int duracionMinutos ;
    @Column(nullable = false)
    private String inicio ;
    @Column()
    private String reglaRecurrencia;
    @Column()
    private Integer idCliente ;
    @Enumerated(EnumType.STRING)
    private Tipo tipo ;
    @Column()
    private Integer idEntrenador ;

    public Evento(String nombre, String descripcion, String observaciones, String lugar, int duracionMinutos, String inicio, String reglaRecurrencia, Integer idCliente, Integer idEntrenador, Tipo tipo,  int id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.observaciones = observaciones;
        this.lugar = lugar;
        this.duracionMinutos = duracionMinutos;
        this.inicio = inicio;
        this.reglaRecurrencia = reglaRecurrencia;
        this.idCliente = idCliente;
        this.tipo = tipo;
        this.idEntrenador = idEntrenador;
    }

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

    public void setIdEntrenador(Integer idEntrenador) {
        this.idEntrenador = idEntrenador;
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

    public int getIdEntrenador() {
        return idEntrenador;
    }

    public Tipo getTipo() {
        return tipo ;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Evento{" +
                "nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", observaciones='" + observaciones + '\'' +
                ", lugar='" + lugar + '\'' +
                ", duracionMinutos=" + duracionMinutos +
                ", inicio='" + inicio + '\'' +
                ", reglaRecurrencia='" + reglaRecurrencia + '\'' +
                ", idCliente=" + idCliente +
                ", tipo=" + tipo +
                ", id=" + id +
                '}';
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Evento) {
            Evento evento = (Evento) obj;
            return this.id == evento.id;
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.id.intValue();
    }
}
