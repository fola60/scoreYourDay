package com.example.syd.repo;

import com.example.syd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User,String> {
    @Query(value = "SELECT * FROM user_table where id = :id", nativeQuery = true)
    public Optional<User> getUserById(String id);

    @Query(value = "DELETE FROM user_table WHERE id = :id", nativeQuery = true)
    public void deleteUser(Long id);


}
