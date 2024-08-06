package com.example.syd.service;

import com.example.syd.config.OAuth2LoginSuccessHandler;
import com.example.syd.entity.TaskData;
import com.example.syd.repo.TaskDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskDataService {

    @Autowired
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Autowired
    private TaskDataRepo taskDataRepo;

    public List<TaskData> getALlTaskData(String id) {
        return taskDataRepo.getAllTaskData(id);
    }

    public void saveTaskData(TaskData taskData) {
        taskData.setUser_id(oAuth2LoginSuccessHandler.getGoogleId());
        taskData.setTimeAdded(LocalDate.now());
        taskDataRepo.save(taskData);
    }

    public void deleteTaskData(String id) {
        taskDataRepo.deleteTaskData(id);
    }
}
