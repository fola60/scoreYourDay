package com.example.syd.service;
import com.example.syd.entity.User;
import com.example.syd.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public Optional<User> UserById(String num) {

        return userRepo.getUserById(num);
    }

    public void saveUser(User user) {
        user.setTimeAdded(LocalDate.now());
        userRepo.save(user);
    }

    public Optional<User> findByUserId(String id) {
        return userRepo.findById(id);
    }

    public void deleteUser(Long id) {
        userRepo.deleteUser(id);
    }
}
