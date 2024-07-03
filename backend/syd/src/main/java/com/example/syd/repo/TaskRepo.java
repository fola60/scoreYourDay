package com.example.syd.repo;


import com.example.syd.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task,Integer> {
    @Query(value = "SELECT * FROM task_table WHERE id = :id", nativeQuery = true)
    public List<Task> getAllTaskById(Integer id);
}
