package com.oopproject.form.models.User;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class Admin extends User {

    private boolean isAdmin;

    public Admin(String id, String username, String email, String password, Date created_at,
            User created_by, boolean isAdmin) {
        super(id, username, email, password, created_at, created_by);
        this.isAdmin = isAdmin;
    }

    public boolean isAdmin() {
        return this.isAdmin;
    }

}