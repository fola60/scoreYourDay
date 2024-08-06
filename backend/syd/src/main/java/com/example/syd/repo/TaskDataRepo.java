package com.example.syd.repo;

import com.example.syd.entity.TaskData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskDataRepo extends JpaRepository<TaskData,String> {
    @Query(value = "DELETE FROM task_data WHERE task_id = :task_id",nativeQuery = true)
    public void deleteTaskData(String task_id);

    @Query(value = "SELECT * FROM task_data WHERE user_id = :user_id",nativeQuery = true)
    public List<TaskData> getAllTaskData(String user_id);
}
