package com.example.studentManagementSystemBackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String admissionType;
    private String admissionBy;
    private Long fee;
    private String motherName;
    private String fatherName;
    private String email;
    private Long phoneNumber;

    private String category;



        // No-args constructor
        public Student() {
        }

        // All-args constructor
        public Student(Long id, String name, String admissionType, String admissionBy, Long fee, String motherName, String fatherName, String email, Long phoneNumber) {
            this.id = id;
            this.name = name;
            this.admissionType = admissionType;
            this.admissionBy = admissionBy;
            this.fee = fee;
            this.motherName = motherName;
            this.fatherName = fatherName;
            this.email = email;
            this.phoneNumber = phoneNumber;
        }

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getAdmissionType() {
            return admissionType;
        }

        public void setAdmissionType(String admissionType) {
            this.admissionType = admissionType;
        }

        public String getAdmissionBy() {
            return admissionBy;
        }

        public void setAdmissionBy(String admissionBy) {
            this.admissionBy = admissionBy;
        }

        public Long getFee() {
            return fee;
        }

        public void setFee(Long fee) {
            this.fee = fee;
        }

        public String getMotherName() {
            return motherName;
        }

        public void setMotherName(String motherName) {
            this.motherName = motherName;
        }

        public String getFatherName() {
            return fatherName;
        }

        public void setFatherName(String fatherName) {
            this.fatherName = fatherName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Long getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(Long phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getCategory(){
            return category;
        }

        public void setCategory(String category){
            this.category = category;
        }
}
