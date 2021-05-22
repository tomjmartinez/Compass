package com.example.Project2;

import com.example.Project2.models.User;
import com.example.Project2.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public class DatabaseLoader implements CommandLineRunner {
    private final UserRepo userRepo;

    @Autowired
    public DatabaseLoader(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    @Override
    public void run(String...strings) throws Exception{
        this.userRepo.save(new User("guest","guest-password"));
    }


}
