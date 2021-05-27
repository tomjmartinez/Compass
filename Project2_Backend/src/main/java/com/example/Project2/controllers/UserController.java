package com.example.Project2.controllers;
import com.example.Project2.models.User;
import com.example.Project2.repos.UserRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.json.JSONObject;
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
    //@CrossOrigin("http://localhost:3000/login")
    @RequestMapping(method = RequestMethod.GET,value = "/users/{username}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Map getUser(@PathVariable String username){
        System.out.println("inside getUser...");
        User user = userRepo.findByUsername(username);
        Map response = new HashMap();
        response.put("user", user); //.toString()
        response.put("userID",user.getId().toString());
        List userAndID = new ArrayList();
        return response;
    }


    @RequestMapping(method = RequestMethod.POST,value = "/secure-login",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Map loginSecure(@RequestBody Map obj){
        System.out.println("inside getUser...");
        System.out.println(obj.toString());
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
            List userAndID = new ArrayList();
        }
        System.out.println(response.toString());
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

    @CrossOrigin("http://localhost:3000/create-geocache")
    @RequestMapping(method = RequestMethod.POST, value = "/user/seeking/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map updateSeeking(@PathVariable String username, @RequestBody String json) {
        System.out.println("------------------");
        User found = userRepo.findByUsername(username);
        found.setSeeking(json);
        System.out.println(found.getSeeking());
        User result = userRepo.save(found);
        Map response = new HashMap();
        response.put("seeking", result.getSeeking());
        return response;
    }
}
