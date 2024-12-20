package com.example.studentManagementSystemBackend.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class NewPasswordDTO {
    private String newPassword;
    private String oldPassword;

    public String getOldPassword(){
        return this.oldPassword;
    }

    public String getNewPassword(){
        return this.newPassword;
    }
    public void setOldPassword(String oldPassword){
        this.oldPassword = oldPassword;
    }
    public void setNewPassword(String newPassword){
        this.newPassword = newPassword;
    }

    public NewPasswordDTO(){

    }

    public NewPasswordDTO(String newPassword,String oldPassword){
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }


}
