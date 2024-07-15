package com.example.syd.repo;

import com.example.syd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User,String> {
    @Query(value = "SELECT * FROM user_table where id = :id", nativeQuery = true)
    public Optional<User> getUserById(String id);

    @Query(value = "SELECT * FROM user_table where id = :id", nativeQuery = true)
    public User getById(String id);

    @Query(value = "DELETE FROM user_table WHERE id = :id", nativeQuery = true)
    public void deleteUser(Long id);

    @Query(value = "UPDATE user_table SET day_completion = :day_completion WHERE id = :id",nativeQuery = true)
    void updateDay(@Param("id") String id, @Param("day_completion") Float day_completion);

    @Query(value = "UPDATE user_table SET week_completion = :week_completion WHERE id = :id",nativeQuery = true)
    void updateWeek(@Param("id") String id, @Param("week_completion") Float week_completion);

    @Query(value = "UPDATE user_table SET month_completion = :month_completion WHERE id = :id",nativeQuery = true)
    void updateMonth(@Param("id") String id, @Param("month_completion") Float month_completion);

    @Query(value = "UPDATE user_table SET year_completion = :year_completion WHERE id = :id",nativeQuery = true)
    void updateYear(@Param("id") String id, @Param("year_completion") Float year_completion);


}
