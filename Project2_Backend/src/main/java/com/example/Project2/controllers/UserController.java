package com.example.Project2.controllers;
import com.example.Project2.models.User;
import com.example.Project2.repos.UserRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "*")
public class UserController {
    private final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserRepo userRepo;

    public UserController(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    /*@GetMapping(value = "users",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllUsers(){
        return ResponseEntity.ok("No Users");
    }
    */
    @CrossOrigin("http://localhost:3000/login")
    @RequestMapping(method = RequestMethod.GET,value = "/users/{username}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Map getUser(@PathVariable String username){
        System.out.println("inside getUser...");
        User user = userRepo.findByUsername(username);
        Map response = new HashMap();
        response.put("user", user); //.toString()
        response.put("userID",user.getId().toString());
        List userAndID = new ArrayList();
        System.out.println(user.getId().toString());
        return response;
    }


    @PostMapping(value="/user")
    ResponseEntity<User> createUser(@RequestBody String json) throws URISyntaxException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User newUser = objectMapper.readValue(json, User.class);
        User result = userRepo.save(newUser);
        System.out.println(result);
        return ResponseEntity.created(new URI("api/user" + result.getUsername()))
                .body(result);
    }
}
