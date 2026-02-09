package com.taskmanager.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.entity.User;
import com.taskmanager.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        String email = normalizeEmail(request.getEmail());
        String password = request.getPassword();

        if (email.isEmpty() || password == null || password.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(LoginResponse.failure("Email and password are required."));
        }

        if (userRepository.existsByUsername(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(LoginResponse.failure("Email already exists. Please use a different email."));
        }

        User user = new User();
        user.setUsername(email);
        user.setName(safeTrim(request.getName()));
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");

        User saved = userRepository.save(user);

        return ResponseEntity.ok(LoginResponse.success(toUserDto(saved)));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        String email = normalizeEmail(request.getEmail());
        String password = request.getPassword();

        if (email.isEmpty() || password == null || password.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(LoginResponse.failure("Email and password are required."));
        }

        User user = userRepository.findByUsername(email).orElse(null);
        if (user == null || user.getPassword() == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(LoginResponse.failure("Invalid email or password."));
        }

        return ResponseEntity.ok(LoginResponse.success(toUserDto(user)));
    }

    private UserDto toUserDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getUsername());
        dto.setName(user.getName());
        dto.setToken(UUID.randomUUID().toString());
        return dto;
    }

    private String normalizeEmail(String email) {
        if (email == null) {
            return "";
        }
        return email.trim().toLowerCase();
    }

    private String safeTrim(String value) {
        return value == null ? "" : value.trim();
    }

    public static class LoginRequest {
        private String email;
        private String password;

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
    }

    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
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
    }

    public static class LoginResponse {
        private boolean success;
        private UserDto user;
        private String message;

        public static LoginResponse success(UserDto user) {
            LoginResponse response = new LoginResponse();
            response.setSuccess(true);
            response.setUser(user);
            response.setMessage("Success");
            return response;
        }

        public static LoginResponse failure(String message) {
            LoginResponse response = new LoginResponse();
            response.setSuccess(false);
            response.setMessage(message);
            return response;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public UserDto getUser() {
            return user;
        }

        public void setUser(UserDto user) {
            this.user = user;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class UserDto {
        private Long id;
        private String email;
        private String name;
        private String token;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}
