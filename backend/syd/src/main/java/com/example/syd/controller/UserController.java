package com.example.syd.controller;


import com.example.syd.entity.Task;
import com.example.syd.entity.User;
import com.example.syd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getDayCompletion/{id}")
    public Float getDay(@PathVariable Float id) {
        return userService.getDayCompletion(id);
    };

    @GetMapping("/getWeekCompletion/{id}")
    public Float getWeek(@PathVariable Float id) {
        return userService.getWeekCompletion(id);
    };

    @GetMapping("/getMonthCompletion/{id}")
    public Float getMonth(@PathVariable Float id) {
        return userService.getMonthCompletion(id);
    };

    @GetMapping("/getYearCompletion/{id}")
    public Float getYear(@PathVariable Float id) {
        return userService.getYearCompletion(id);
    };


    @PutMapping("/day")
    public ResponseEntity<Void> updateDay(@Validated @RequestBody User user) {
        String id = user.getId();
        User updatedUser = new User();
        updatedUser = userService.getByIdExist(id);
        updatedUser.setDayCompletion(user.getDayCompletion());
        userService.saveUser(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/week")
    public ResponseEntity<Void> updateWeek(@Validated @RequestBody User user) {
        String id = user.getId();
        User updatedUser = new User();
        updatedUser = userService.getByIdExist(id);
        updatedUser.setWeekCompletion(user.getWeekCompletion());
        userService.saveUser(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/month")
    public ResponseEntity<Void> updateMonth(@Validated @RequestBody User user) {
        String id = user.getId();
        User updatedUser = new User();
        updatedUser = userService.getByIdExist(id);
        updatedUser.setMonthCompletion(user.getMonthCompletion());
        userService.saveUser(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/year")
    public ResponseEntity<Void> updateYear(@Validated @RequestBody User user) {
        String id = user.getId();
        User updatedUser = new User();
        updatedUser = userService.getByIdExist(id);
        updatedUser.setYearCompletion(user.getYearCompletion());
        userService.saveUser(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
