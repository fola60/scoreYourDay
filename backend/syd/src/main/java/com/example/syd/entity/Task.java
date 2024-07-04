package com.example.syd.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;


@Entity
@Table(name = "task_table")
public class Task {
    @Id
    @Column(name="id")
    private Integer id;

    @Column(name="task_name")
    private String taskName;

    @Column(name="task_date")
    private LocalDate taskDate;

    @Column(name="time_added")
    private LocalDate timeAdded;



    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getTaskDate() {
        return taskDate;
    }

    public void setTaskDate(LocalDate taskDate) {
        this.taskDate = taskDate;
    }

    public LocalDate getTimeAdded() {
        return timeAdded;
    }

    public void setTimeAdded(LocalDate timeAdded) {
        this.timeAdded = timeAdded;
    }
}
