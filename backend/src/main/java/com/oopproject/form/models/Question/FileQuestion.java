package com.oopproject.form.models.Question;

import java.util.Date;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FileQuestion extends Question {

    private String fileName;
    private String fileType;
    private byte[] data;

    public FileQuestion(String questionId, int questionOrder, String questionTitle, String questionType, boolean isRequired, String conditionalParentId, String conditionalParentCondition,
            Date createdAt, Date updatedAt, Date deletedAt, String fileName, String fileType, byte[] data) {
        super(questionId, questionOrder, questionTitle, questionType, isRequired, conditionalParentId, conditionalParentCondition, createdAt, updatedAt, deletedAt);
        this.fileName = fileName; 
        this.fileType = fileType;
        this.data = data;
    }

    // public byte[] getData() {
    //     return data;
    // }

    // public void setData(byte[] data) {
    //     this.data = data;
    // }

}
