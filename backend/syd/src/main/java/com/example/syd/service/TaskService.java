package com.example.syd.service;


import com.example.syd.entity.Task;
import com.example.syd.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    public List<Task> getTasks(Integer id) {

        return taskRepo.getAllTaskById(id);
    }

    public void saveTask(Task task) {
        task.setTimeAdded(LocalDate.now());
        taskRepo.save(task);
    }
}
