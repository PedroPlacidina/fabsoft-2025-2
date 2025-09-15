package br.univille.fabsoft_backend.entity;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataChekin;
    @Temporal(TemporalType.DATE)
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataChekout;
    private String status;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Date getDataChekin() {
        return dataChekin;
    }
    public void setDataChekin(Date dataChekin) {
        this.dataChekin = dataChekin;
    }
    public Date getDataChekout() {
        return dataChekout;
    }
    public void setDataChekout(Date dataChekout) {
        this.dataChekout = dataChekout;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
