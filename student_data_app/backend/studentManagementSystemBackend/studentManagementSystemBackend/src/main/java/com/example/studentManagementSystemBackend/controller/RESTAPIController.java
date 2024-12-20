package com.example.studentManagementSystemBackend.controller;

import com.example.studentManagementSystemBackend.Repository.StudentRepo;
import com.example.studentManagementSystemBackend.configuration.AuthenticationProvider;
import com.example.studentManagementSystemBackend.entity.Student;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.CharBuffer;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173",originPatterns = "/**",methods = {RequestMethod.DELETE,RequestMethod.GET,RequestMethod.OPTIONS,RequestMethod.POST,RequestMethod.PATCH},allowCredentials = "true",allowedHeaders = "*",exposedHeaders = "Set-Cookie")
public class RESTAPIController {
    StudentRepo studentRepo;

    AuthenticationProvider authenticationProvider;

    PasswordEncoder passwordEncoder;

    RESTAPIController(StudentRepo studentRepo,AuthenticationProvider authenticationProvider,PasswordEncoder passwordEncoder){
        this.studentRepo = studentRepo;
        this.authenticationProvider=authenticationProvider;
        this.passwordEncoder = passwordEncoder;
    }

    String password = "$2a$12$ojS3hfWnmkwafwcEQiwfIu509kGpagb0rWqZGVjC1m7XSVSoY9acS";

    @PostMapping("/login")
    public ResponseEntity loginStudent(@RequestBody PasswordDTO passwordDTO, HttpServletResponse response){
        System.out.println(passwordDTO.getPassword());
          if(passwordEncoder.matches(CharBuffer.wrap(passwordDTO.getPassword()),password)){
              System.out.println(passwordDTO.getPassword());

              Cookie cookie = new Cookie("jwt",authenticationProvider.createToken());
              cookie.setPath("/");
              cookie.setSecure(false);
              cookie.setHttpOnly(true);
              cookie.setMaxAge(24*60*60);

              response.addCookie(cookie);

              return ResponseEntity.status(HttpStatus.OK).build();
          }else{
              return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
          }
    }

    @GetMapping("/check")
    public ResponseEntity checkAuthentication(){
        Object userAuthentication = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(userAuthentication instanceof String){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

  /*  @PostMapping("/login/change")
    public ResponseEntity loginStudent(@RequestBody ChangePasswordDTO passwordDTO){

    }*/

    @GetMapping("/student/get")
    public ResponseEntity getStudentDetails(){
        List<Student> studentList = studentRepo.findAll();
        return ResponseEntity.ok(studentList);
    }

    @GetMapping("/student/get/{id}")
    public ResponseEntity getOneStudent(@PathVariable Long id){
        Optional<Student> student = studentRepo.findById(id);

        if(student.isPresent()){
            return ResponseEntity.ok(Collections.singletonMap("message",student));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/student")
    public ResponseEntity postStudent(@RequestBody Student student){
        System.out.println(student.getCategory());
        System.out.println(student.getName());
        studentRepo.save(student);
       return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/student/update/{id}")
    public ResponseEntity updateStudent(@PathVariable Long id,@RequestBody Student student){
        Optional<Student> student1 = studentRepo.findById(id);
        if(student1.isPresent()){
            Student student2 = (Student) student1.get();

            student2.setFee(student.getFee());
            student2.setEmail(student.getEmail());
            student2.setAdmissionBy(student.getAdmissionBy());
            student2.setName(student.getName());
            student2.setFatherName(student.getFatherName());
            student2.setMotherName(student.getMotherName());
            student2.setPhoneNumber(student.getPhoneNumber());
            student2.setAdmissionType(student.getAdmissionType());

            studentRepo.save(student2);
            return ResponseEntity.status(HttpStatus.OK).build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/student/delete/{id}")
    public ResponseEntity deleteOneStudent(@PathVariable Long id){
        Optional<Student> student1 = studentRepo.findById(id);
        if(student1.isPresent()) {
              studentRepo.deleteById(id);

            return ResponseEntity.status(HttpStatus.OK).build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/student/delete")
    public ResponseEntity deleteAllStudents(){
        studentRepo.deleteAll();
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
