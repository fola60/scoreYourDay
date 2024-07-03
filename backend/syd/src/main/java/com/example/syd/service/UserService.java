package com.example.syd.service;
import com.example.syd.entity.User;
import com.example.syd.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public List<User> GetUserById(Integer num) {

        return userRepo.getAllUserById(num);
    }
}
