package com.example.syd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "task_data")
public class TaskData {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "task_id")
    private String taskId;

    @Column(name = "user_id")
    private String user_id;

    @Column(name = "time_added")
    private LocalDate timeAdded;

    @Column(name = "comp_diff")
    private Long compDiff;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public LocalDate getTimeAdded() {
        return timeAdded;
    }

    public void setTimeAdded(LocalDate timeAdded) {
        this.timeAdded = timeAdded;
    }

    public Long getCompDiff() {
        return compDiff;
    }

    public void setCompDiff(Long compDiff) {
        this.compDiff = compDiff;
    }




}
