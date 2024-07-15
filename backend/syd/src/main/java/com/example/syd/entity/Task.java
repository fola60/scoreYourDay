package com.example.syd.entity;


import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "task_table")
public class Task {
    @Id
    @Column(name="id")
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name="task_name")
    private String taskName;

    @Column(name = "task_description")
    private String taskDescription;

    @Column(name="task_date")
    private LocalDate taskDate;

    @Column(name="time_added")
    private LocalDate timeAdded;

    @Column(name = "task_completion")
    private Integer taskCompletion = 0;



    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
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



    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getUser_id() {
        return userId;
    }

    public void setUser_id(String user_id) {
        this.userId = user_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getTaskCompletion() {
        return taskCompletion;
    }

    public void setTaskCompletion(Integer taskCompletion) {
        this.taskCompletion = taskCompletion;
    }
}
