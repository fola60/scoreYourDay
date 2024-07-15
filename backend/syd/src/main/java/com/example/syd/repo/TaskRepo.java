package com.example.syd.repo;


import com.example.syd.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task,String> {
    @Query(value = "SELECT * FROM task_table WHERE user_id = :user_id", nativeQuery = true)
    public List<Task> getAllTaskById(String user_id);

    @Query(value = "DELETE FROM task_table WHERE id = :id", nativeQuery = true)
    public void deleteTask(String id);


}
