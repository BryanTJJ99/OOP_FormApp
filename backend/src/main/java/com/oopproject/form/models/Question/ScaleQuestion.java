package com.oopproject.form.models.Question;

public class ScaleQuestion extends Question {
    private int minValue;
    private int maxValue;
    private int response;

    public ScaleQuestion(String questionStatement, String category, boolean isRequiredField,
            String documents, int minValue, int maxValue, int response) {
        super(questionStatement, category, isRequiredField, documents);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.response = response;
    }

    public int getMinValue() {
        return minValue;
    }

    public void setMinValue(int minValue) {
        this.minValue = minValue;
    }

    public int getMaxValue() {
        return maxValue;
    }

    public void setMaxValue(int maxValue) {
        this.maxValue = maxValue;
    }

    public int getResponse() {
        return response;
    }

    public void setResponse(int response) {
        this.response = response;
    }

}
