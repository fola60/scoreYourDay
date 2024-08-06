package com.example.syd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name="user_table")
public class User {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name="email")
    private String email;

    @Column(name="name")
    private String name;

    @Column(name="time_added")
    private LocalDate timeAdded;

    @Column(name = "day_completion")
    private Integer dayCompletion;

    @Column(name = "month_completion")
    private Integer monthCompletion;

    @Column(name = "year_completion")
    private Integer yearCompletion;

    @Column(name = "week_completion")
    private Integer weekCompletion ;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getTimeAdded() {
        return timeAdded;
    }

    public void setTimeAdded(LocalDate timeAdded) {
        this.timeAdded = timeAdded;
    }

    public Integer getWeekCompletion() {
        return weekCompletion;
    }

    public void setWeekCompletion(Integer weekCompletion) {
        this.weekCompletion = weekCompletion;
    }

    public Integer getYearCompletion() {
        return yearCompletion;
    }

    public void setYearCompletion(Integer yearCompletion) {
        this.yearCompletion = yearCompletion;
    }

    public Integer getMonthCompletion() {
        return monthCompletion;
    }

    public void setMonthCompletion(Integer monthCompletion) {
        this.monthCompletion = monthCompletion;
    }

    public Integer getDayCompletion() {
        return dayCompletion;
    }

    public void setDayCompletion(Integer dayCompletion) {
        this.dayCompletion = dayCompletion;
    }
}
