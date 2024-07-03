package com.example.syd.controller;

import com.example.syd.entity.User;
import com.example.syd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class taskController {

    @Autowired
    private UserService userService;

    @GetMapping("/getTasks/{id}")
    public List<User> getAllTasks(@PathVariable Integer id) {
        return userService.GetUserById(id);
    }
}
