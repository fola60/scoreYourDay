package com.example.syd.service;


import com.example.syd.config.OAuth2LoginSuccessHandler;
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
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Autowired
    private TaskRepo taskRepo;

    public List<Task> getTasks(String id) {

        return taskRepo.getAllTaskById(id);
    }

    public void saveTask(Task task) {
        task.setTimeAdded(LocalDate.now());
        task.setUser_id(oAuth2LoginSuccessHandler.getGoogleId());
        taskRepo.save(task);
    }

    public void deleteTask(String id) {
        taskRepo.deleteTask(id);
    }

    public void updateTask(Task task) {
        deleteTask(task.getId());
        saveTask(task);
    }
}
