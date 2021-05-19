package com.example.Project2.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="users")
public class User {
    @Id
    private ObjectId id;
    private String username;
    private String password;
    private ObjectId[] geocaches;
    private GeoCache seeking;
}
