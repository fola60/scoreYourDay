package com.example.syd.controller;

import com.example.syd.entity.Task;
import com.example.syd.entity.User;
import com.example.syd.service.TaskService;
import com.example.syd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tasks")
public class taskController {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @GetMapping("/getTasks/{id}")
    public List<Task> getAllTasks(@PathVariable Integer id) {
        return taskService.getTasks(id);
    }

    @PostMapping
    public ResponseEntity<Void> save(@Validated @RequestBody Task task) {
        taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
