package net.javaguides.ems.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.AuthResponse;
import net.javaguides.ems.dto.CompanyLoginRequest;
import net.javaguides.ems.dto.CompanySignupRequest;
import net.javaguides.ems.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody CompanySignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody CompanyLoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
