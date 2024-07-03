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
    private LocalDate localDate;
}
