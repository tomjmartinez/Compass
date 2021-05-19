package com.example.Project2;

import com.example.Project2.models.GeoCache;
import com.example.Project2.models.GeoCacheRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Project2BackendApplication {

	private GeoCache geoCache;

	@Autowired
	public Project2BackendApplication(GeoCache geoCache) {
		this.geoCache = geoCache;
	}

	public static void main(String[] args) {
		SpringApplication.run(Project2BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner() {
		return a -> {
			GeoCache geoCache1 = GeoCacheRepo.findById(new ObjectId("")).orElse(null);
		};
	}

}
