package com.example.studentManagementSystemBackend.controller;

import lombok.Data;

@Data
public class ChangePasswordDTO {
    String currentPassword;
    String newPassword;
}
