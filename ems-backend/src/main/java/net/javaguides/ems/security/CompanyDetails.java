package net.javaguides.ems.security;

import net.javaguides.ems.entity.Company;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CompanyDetails implements UserDetails {

    private final Company company;

    public CompanyDetails(Company company) {
        this.company = company;
    }

    public Long getId() {
        return company.getId();
    }

    public Company getCompany() {
        return company;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return company.getPassword();
    }

    @Override
    public String getUsername() {
        return company.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
