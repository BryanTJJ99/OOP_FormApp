package com.oopproject.form.payload.request;

// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Size;

// public class SignupRequest {
//     @NotBlank
//     @Size(min = 3, max = 20)
//     private String username;

//     @NotBlank
//     @Size(max = 50)
//     @Email
//     private String email;

//     private String role;

//     @NotBlank
//     @Size(min = 6, max = 40)
//     private String password;

//     public String getUsername() {
//         return username;
//     }

//     public void setUsername(String username) {
//         this.username = username;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public String getPassword() {
//         return password;
//     }

//     public void setPassword(String password) {
//         this.password = password;
//     }

//     public String getRole() {
//         return this.role;
//     }

//     public void setRole(String role) {
//         this.role = role;
//     }
// }
public class SignupRequest {
    private String username;

    private String email;

    private String role;

    private String password;

    private String country;

    public String getUsername() {
    return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
