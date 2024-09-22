package com.example.syd.config.UserConfig;

import com.example.syd.entity.User;
import com.example.syd.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Component
@Slf4j
public class InitialUserInfo implements CommandLineRunner {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {
        User manager = new User();
        manager.setId(UUID.randomUUID().toString());
        manager.setName("Manager");
        manager.setPassword(passwordEncoder.encode("password"));
        manager.setRoles("ROLE_MANAGER");
        manager.setEmail("manager@manager.com");

        User admin = new User();
        admin.setId(UUID.randomUUID().toString());
        admin.setName("Admin");
        admin.setPassword(passwordEncoder.encode("password"));
        admin.setRoles("ROLE_ADMIN");
        admin.setEmail("admin@admin.com");

        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName("User");
        user.setPassword(passwordEncoder.encode("password"));
        user.setRoles("ROLE_USER");
        user.setEmail("user@user.com");

        userRepo.saveAll(List.of(manager,admin,user));
    }

}
