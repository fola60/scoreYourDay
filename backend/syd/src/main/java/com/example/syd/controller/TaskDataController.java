package com.example.syd.controller;

import com.example.syd.entity.TaskData;
import com.example.syd.service.TaskDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taskData")
public class TaskDataController {

    @Autowired
    private TaskDataService taskDataService;

    @GetMapping("/getTaskData/{id}")
    public List<TaskData> getTaskData(@PathVariable String id) {
        return taskDataService.getALlTaskData(id);
    }

    @DeleteMapping("/deleteTaskData/{id}")
    public void deleteTaskData(@PathVariable String id) {
        taskDataService.deleteTaskData(id);
    }

    @PostMapping("/postTaskData")
    public void postTaskData(@Validated @RequestBody TaskData taskData) {
        taskDataService.saveTaskData(taskData);
    }


}
