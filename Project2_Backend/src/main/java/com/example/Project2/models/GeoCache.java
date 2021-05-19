package com.example.Project2.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

/**Class represents
 * @author: Tomas J. Martinez
 */
@Document(collection="compass")
public class GeoCache {
    @Id
    Object id;
    float[] coordinates = new float[2];
    String description;
    String gifter;
    String reviewer;
    boolean approved;
    String finder;
    boolean found;
    long timeLimit;

}
