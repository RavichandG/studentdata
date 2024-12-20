package com.example.studentManagementSystemBackend.controller;


public class PasswordDTO {
   private String password;

   public PasswordDTO(){

   }
    public PasswordDTO(String password){
        this.password = password;
    }

    public String getPassword(){
       return this.password;
    }
    public void setPassword(String password1){
       this.password = password1;
    }
}
