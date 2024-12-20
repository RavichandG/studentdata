package com.example.studentManagementSystemBackend.Repository;

import com.example.studentManagementSystemBackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student,Long> {
}
