package com.example.Project2.controllers;

/**
 * Represents the User Controller
 * @Author Emanuel Garcia
 */

import com.example.Project2.models.User;
import com.example.Project2.repos.UserRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.net.URISyntaxException;
import java.util.*;

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "*")
public class UserController {
    private final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserRepo userRepo;

    /**
     * @param userRepo Sets up the UserRepo
     */
    public UserController(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    /**
     * @param username The username that is being looked up
     * @return A map that contains the user and its id as a string
     */
    @RequestMapping(method = RequestMethod.GET,value = "/users/{username}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Map getUser(@PathVariable String username){
        log.info("inside getUser...");
        User user = userRepo.findByUsername(username);
        Map response = new HashMap();
        response.put("user", user);
        response.put("userID",user.getId().toString());
        return response;
    }

    /**
     * @param obj The username and password for logging in
     * @return A map of if the login is successful, and if it is, the user and userID in a string
     */
    @RequestMapping(method = RequestMethod.POST,value = "/secure-login",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Map loginSecure(@RequestBody Map obj){
        log.info("inside getUser..." + obj.toString());
        String username = (String) obj.get("username");
        String password = (String) obj.get("password");
        User user = userRepo.findByUsernameAndPassword(username, password);

        Map response = new HashMap();
        response.put("successful", false);
        if(user != null) {
            response.put("successful", true);
            response = new HashMap();
            response.put("user", user); //.toString()
            response.put("userID", user.getId().toString());
        }

        log.info(response.toString());
        return response;
    }

    /**
     * @param json The username and password in a json string
     * @return The new user
     * @throws URISyntaxException
     * @throws JsonProcessingException
     */
    @PostMapping(value="/user")
    public User createUser(@RequestBody String json) throws URISyntaxException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User newUser = objectMapper.readValue(json, User.class);
        User result = userRepo.save(newUser);
        log.info("New User: " + result);
        return result;
    }

    /**
     * @param username The user that is updating which geocache they are looking for
     * @param json The string of the geoCache id that the user is now looking for
     * @return A map containing the user seeking string - which is the geocache id
     */
    @CrossOrigin("http://localhost:3000/create-geocache")
    @RequestMapping(method = RequestMethod.POST, value = "/user/seeking/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map updateSeeking(@PathVariable String username, @RequestBody String json) {
        User found = userRepo.findByUsername(username);
        found.setSeeking(json);
        User result = userRepo.save(found);
        Map response = new HashMap();
        response.put("seeking", result.getSeeking());
        log.info("Now seeking: " + result.getSeeking());
        return response;
    }
}
