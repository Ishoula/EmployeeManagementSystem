package net.javaguides.ems.service;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.AuthResponse;
import net.javaguides.ems.dto.CompanyLoginRequest;
import net.javaguides.ems.dto.CompanySignupRequest;
import net.javaguides.ems.entity.Company;
import net.javaguides.ems.repository.CompanyRepository;
import net.javaguides.ems.security.CompanyDetails;
import net.javaguides.ems.security.CompanyDetailsService;
import net.javaguides.ems.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CompanyDetailsService companyDetailsService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse signup(CompanySignupRequest request) {
        if (companyRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(CONFLICT, "Email already registered");
        }

        Company company = Company.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .build();
        companyRepository.save(company);

        CompanyDetails details = (CompanyDetails) companyDetailsService.loadUserByUsername(request.email());
        String token = jwtTokenProvider.generateToken(details);
        return new AuthResponse(token);
    }

    public AuthResponse login(CompanyLoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        CompanyDetails details = (CompanyDetails) authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(details);
        return new AuthResponse(token);
    }
}
