package com.example.Project2.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

/**Class represents
 * @author: Tomas J. Martinez
 */
@Document(collection="geocaches")
public class GeoCache {
    @Id
    private ObjectId id;
    private float[] coordinates = new float[2];
    private String description;
    private String gifter; //Should this be of ObjectId type?
    private String reviewer; //Should this be of ObjectId type?
    private boolean approved;
    private String finder; //Should this be of ObjectId type?
    private boolean found;
    private long timeLimit;

}
