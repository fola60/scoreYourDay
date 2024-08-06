package com.example.syd.controller;


import com.example.syd.entity.Task;
import com.example.syd.entity.User;
import com.example.syd.repo.UserRepo;
import com.example.syd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/getUser/{id}")
    public Optional<User> getUserByid(@PathVariable String id) {
        return userService.UserById(id);
    }

    @GetMapping("/getDayCompletion/{id}")
    public int getDay(@PathVariable String id) {
        Integer dayCompletion = userService.getDayCompletion(id);
        return dayCompletion;
    }

    @GetMapping("/getWeekCompletion/{id}")
    public int getWeek(@PathVariable String id) {
        Integer weekCompletion = userService.getWeekCompletion(id);
        return weekCompletion;
    }

    @GetMapping("/getMonthCompletion/{id}")
    public int getMonth(@PathVariable String id) {
        Integer monthCompletion = userService.getMonthCompletion(id);
        return monthCompletion;
    }

    @GetMapping("/getYearCompletion/{id}")
    public int getYear(@PathVariable String id) {
        Integer yearCompletion = userService.getYearCompletion(id);
        return yearCompletion;
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteuser(@PathVariable String id) {
        userService.deleteUser(id);
    }


    @PostMapping("/day")
    public ResponseEntity<Void> updateDay(@Validated @RequestBody User user) {
        String id = user.getId();
        User updatedUser = new User();
        updatedUser = userService.getByIdExist(id);
        updatedUser.setDayCompletion(user.getDayCompletion());
        userService.saveUser(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/week")
    public ResponseEntity<Void> updateWeek(@Validated @RequestBody User user) {
        String id = user.getId();
        User updatedUser = new User();
        updatedUser = userService.getByIdExist(id);
        updatedUser.setWeekCompletion(user.getWeekCompletion());
        userService.saveUser(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/month")
    public ResponseEntity<Void> updateMonth(@Validated @RequestBody User user) {
        String id = user.getId();
        User updatedUser = new User();
        updatedUser = userService.getByIdExist(id);
        updatedUser.setMonthCompletion(user.getMonthCompletion());
        userService.saveUser(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/year")
    public ResponseEntity<Void> updateYear(@Validated @RequestBody User user) {
        String id = user.getId();
        User updatedUser = new User();
        updatedUser = userService.getByIdExist(id);
        updatedUser.setYearCompletion(user.getYearCompletion());
        userService.saveUser(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/saveUser")
    public void saveUser(@Validated @RequestBody User user) {
        userService.saveUser(user);
    }
}
