package com.oopproject.form.models.User;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class Approver extends Admin {

    private boolean isApprover;

    public Approver(String id, String username, String email, String password, String role, Date created_at,
            User created_by, boolean isAdmin, boolean isApprover) {
        super(id, username, email, password, role, created_at, created_by, isAdmin);
        this.isApprover = isApprover;
    }

    public boolean isApprover() {
        return this.isApprover;
    }

}