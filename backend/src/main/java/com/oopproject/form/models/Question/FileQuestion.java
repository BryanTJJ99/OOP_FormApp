package com.oopproject.form.models.Question;

public class FileQuestion extends Question {

    private String fileName;
    private String contentType;
    private byte[] data;

    public FileQuestion(String questionStatement, String category, boolean isRequiredField,
            String documents) {
        super(questionStatement, category, isRequiredField, documents);
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

}
