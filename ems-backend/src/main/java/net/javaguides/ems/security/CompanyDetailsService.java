package net.javaguides.ems.security;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.entity.Company;
import net.javaguides.ems.repository.CompanyRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyDetailsService implements UserDetailsService {

    private final CompanyRepository companyRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Company company = companyRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Company not found with email: " + username));
        return new CompanyDetails(company);
    }
}
