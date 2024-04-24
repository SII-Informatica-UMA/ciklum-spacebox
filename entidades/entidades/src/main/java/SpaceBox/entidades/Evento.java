package SpaceBox.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity

public class Evento  {
    @Id @GeneratedValue
    private int id ;
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
    private String reglaRecurrencia	;
    @Column()
    private int idCliente ;
    private enum Tipo	{ DISPONIBILIDAD , CITA }
    @Enumerated(EnumType.STRING)
    private Tipo tipo ;

    public Evento(String nombre, String descripcion, String observaciones, String lugar, int duracionMinutos, String inicio, String reglaRecurrencia, int idCliente, Tipo tipo,  int id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.observaciones = observaciones;
        this.lugar = lugar;
        this.duracionMinutos = duracionMinutos;
        this.inicio = inicio;
        this.reglaRecurrencia = reglaRecurrencia;
        this.idCliente = idCliente;
        this.tipo = tipo;
    }

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

    private void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    private void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public void setId(int id) {
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

    public int getId() {
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
        return this.id;
    }
}
