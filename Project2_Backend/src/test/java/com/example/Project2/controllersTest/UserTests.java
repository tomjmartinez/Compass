package com.example.Project2.controllersTest;

import com.example.Project2.controllers.*;
import com.example.Project2.models.*;
import com.example.Project2.repos.*;
import com.fasterxml.jackson.core.*;
import org.bson.types.ObjectId;
import org.json.*;
import org.junit.*;

import org.junit.Test;
import org.mockito.*;
import org.mockito.stubbing.*;
import org.springframework.data.mongodb.core.geo.*;

import java.net.*;
import java.util.*;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserTests {

    private UserRepo userRepo = Mockito.mock(UserRepo.class);

    private UserController userController = new UserController(userRepo);

    @Test
    public void testAddUser() throws JSONException, URISyntaxException, JsonProcessingException {
        User test = new User();
        ObjectId id = new ObjectId("60aaba9c761ccc0d2edc42e9");
        JSONObject json = new JSONObject();
        json.put("username", "test");
        json.put("password", "test");

        User user = new User("test", "test");
        user.setId(id);

        when(userRepo.save(any(User.class))).thenReturn(user);

        test = userController.createUser(json.toString());
        Assert.assertEquals(test.getId(), user.getId());
    }

    @Test
    public void testUpdateSeeking() {
        User user = new User();
        ObjectId geoCacheId = new ObjectId("60aaba9c761ccc0d2edc42e8");
        ObjectId userId = new ObjectId("60aaba9c761ccc0d2edc42e9");
        user.setId(userId);
        user.setPassword("test");
        user.setUsername("test");
        user.setSeeking(geoCacheId.toString());
        User test = new User("test", "test");
        test.setId(userId);
        when(userRepo.findByUsername("test")).thenReturn(test);
        when(userRepo.save(any(User.class))).thenReturn(user);
        Assert.assertEquals(userController.updateSeeking("test", geoCacheId.toString()).get("seeking"), geoCacheId.toString());
    }

    @Test
    public void testGetUser() {
        User user = new User("user", "user");
        ObjectId userId = new ObjectId("60aaba9c761ccc0d2edc42e9");
        user.setId(userId);
        when(userRepo.findByUsername("user")).thenReturn(user);
        Map results = userController.getUser("user");
        Assert.assertEquals(user, results.get("user"));
        Assert.assertEquals(userId.toString(), results.get("userID"));
    }

    @Test
    public void testSecureLogin() {
        User user = new User("user", "user");
        ObjectId userId = new ObjectId("60aaba9c761ccc0d2edc42e9");
        user.setId(userId);
        when(userRepo.findByUsernameAndPassword("user", "user")).thenReturn(user);
        Map input = new HashMap();
        input.put("username", "user");
        input.put("password", "user");
        Map results = userController.loginSecure(input);
        Assert.assertEquals(results.get("user"), user);
        Assert.assertEquals(results.get("userID"), user.getId().toString());
    }
}
