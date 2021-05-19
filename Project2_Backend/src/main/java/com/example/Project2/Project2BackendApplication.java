package com.example.Project2;

import com.example.Project2.models.GeoCache;
import com.example.Project2.models.GeoCacheRepo;
import org.bson.types.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Project2BackendApplication {

	private GeoCacheRepo geoCacheRepo;

	@Autowired
	public Project2BackendApplication(GeoCacheRepo geoCacheRepo) {
		this.geoCacheRepo = geoCacheRepo;
	}

	public static void main(String[] args) {
		SpringApplication.run(Project2BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner() {
		return a -> {
			GeoCache geoCache1 = geoCacheRepo.findById(new ObjectId("60a58d0cbf60f52c36a12bf5")).orElse(null);
			System.out.println(geoCache1);
		};
	}

}
