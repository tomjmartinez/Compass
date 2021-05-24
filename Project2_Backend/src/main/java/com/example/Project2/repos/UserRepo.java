package com.example.Project2.repos;

import com.example.Project2.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);
}
