package net.javaguides.ems.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CompanyContext {

    public Long currentCompanyId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof CompanyDetails companyDetails)) {
            throw new IllegalStateException("No authenticated company found in security context");
        }
        return companyDetails.getId();
    }
}
