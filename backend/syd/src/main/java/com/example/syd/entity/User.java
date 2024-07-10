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
    private float dayCompletion;

    @Column(name = "month_completion")
    private float monthCompletion;

    @Column(name = "year_completion")
    private float yearCompletion;

    @Column(name = "week_completion")
    private float weekCompletion;


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

    public float getWeekCompletion() {
        return weekCompletion;
    }

    public void setWeekCompletion(float weekCompletion) {
        this.weekCompletion = weekCompletion;
    }

    public float getYearCompletion() {
        return yearCompletion;
    }

    public void setYearCompletion(float yearCompletion) {
        this.yearCompletion = yearCompletion;
    }

    public float getMonthCompletion() {
        return monthCompletion;
    }

    public void setMonthCompletion(float monthCompletion) {
        this.monthCompletion = monthCompletion;
    }

    public float getDayCompletion() {
        return dayCompletion;
    }

    public void setDayCompletion(float dayCompletion) {
        this.dayCompletion = dayCompletion;
    }
}
