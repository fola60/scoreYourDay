package com.example.syd.entity;


import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "task_table")
public class Task {
    @Id
    @Column(name="id")
    private String id;

    @Column(name="task_name")
    private String taskName;

    @Column(name = "task_description")
    private String taskDescription;

    @Column(name="task_id",nullable = false, unique = true)
    private String taskId;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }
}
