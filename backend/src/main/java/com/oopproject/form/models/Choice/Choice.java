package com.oopproject.form.models.Choice;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.oopproject.form.models.Section.Section;

@Document(collection = "Choice")
public class Choice {
    @Id
    private String choiceId; 
    private String choiceName; 
    private Date createdAt; 
    private Date updatedAt; 
    private Date deletedAt; 
    
}