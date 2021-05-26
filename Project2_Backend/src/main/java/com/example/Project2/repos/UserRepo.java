package com.example.Project2.repos;

import com.example.Project2.models.GeoCache;
import com.example.Project2.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepo extends MongoRepository<User, String> {
    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);

    @Query("{$and: [{'username': username}, {'password': password}]}")
    User findByUsernameAndPasswordSecure(String username, String password);
}
