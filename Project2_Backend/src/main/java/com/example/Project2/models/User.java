package com.example.Project2.models;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="users")
public class User {
    @Id
    private ObjectId id;
    private String username;
    private String password;
    private ObjectId[] geocaches;
    private GeoCache seeking;
}
