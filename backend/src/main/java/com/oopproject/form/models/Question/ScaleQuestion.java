package com.oopproject.form.models.Question;

public class ScaleQuestion extends Question {
    private int minValue;
    private int maxValue;
    private String minLabel; 
    private String maxLabel; 

    public ScaleQuestion(String questionId, int questionOrder, String questionTitle, String questionType, boolean isRequired, String conditionalParentId, String conditionalParentCondition,
            Date createdAt, Date updatedAt, Date deletedAt, int minValue, int maxValue, String minLabel, String maxLabel) {
        super(questionId, questionOrder, questionTitle, questionType, isRequired, conditionalParentId, conditionalParentCondition, createdAt, updatedAt, deletedAt);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.minLabel = minLabel; 
        this.maxLabel = maxLabel; 
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
}
