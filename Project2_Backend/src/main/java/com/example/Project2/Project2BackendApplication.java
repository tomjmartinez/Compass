package com.example.Project2;

import com.example.Project2.models.GeoCache;
import com.example.Project2.models.GeoCacheRepo;
import com.example.Project2.models.User;
import com.example.Project2.repos.UserRepo;
import org.bson.types.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Project2BackendApplication {

	private GeoCacheRepo geoCacheRepo;
	private DatabaseLoader databaseLoader;
	private UserRepo userRepo;

	@Autowired
	public Project2BackendApplication(UserRepo userRepo) {
		this.userRepo = userRepo;
	}

	public static void main(String[] args) {
		SpringApplication.run(Project2BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner() {
		return args -> {
			System.out.println("Hello World");
		};
	}

}

