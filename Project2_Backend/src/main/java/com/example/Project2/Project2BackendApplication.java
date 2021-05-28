package com.example.Project2;

import org.apache.logging.log4j.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Project2BackendApplication {
	public static final Logger logger = (Logger) LogManager.getLogger(Project2BackendApplication.class.getName());
	public static final Logger rootLogger = (Logger) LogManager.getRootLogger();


	public static void main(String[] args) {
		SpringApplication.run(Project2BackendApplication.class, args);
		logger.info("Application starting");
	}

}

