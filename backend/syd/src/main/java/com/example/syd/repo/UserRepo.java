package com.example.syd.repo;

import com.example.syd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    @Query(value = "SELECT * FROM user_table where id = :id", nativeQuery = true)
    public List<User> getAllUserById(Integer id);
}
