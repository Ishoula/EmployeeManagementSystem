package net.javaguides.ems.service;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Company;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.CompanyRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.security.CompanyContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeServiceImpl implements EmployeeService{

    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;
    private final CompanyContext companyContext;

    @Override
    @Transactional
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Long companyId = companyContext.currentCompanyId();
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company with given id doesn't exist: " + companyId));

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto, company);
        Employee savedEmployee= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {

        Long companyId = companyContext.currentCompanyId();

       Employee employee= employeeRepository.findByIdAndCompanyId(employeeId, companyId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with given id doesn't exist: "+employeeId));
       return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        Long companyId = companyContext.currentCompanyId();

        List<Employee>employees=employeeRepository.findAllByCompanyId(companyId);
        return employees.stream().map((employee -> EmployeeMapper.mapToEmployeeDto(employee)))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Long companyId = companyContext.currentCompanyId();

       Employee employee= employeeRepository.findByIdAndCompanyId(employeeId, companyId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with given id doesn't exist: "+employeeId));

       employee.setFirstName(updatedEmployee.getFirstName());
       employee.setLastName(updatedEmployee.getLastName());
       employee.setEmail(updatedEmployee.getEmail());

       Employee updatedEmployeeObj=employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    @Transactional
    public void deleteEmployee(Long employeeId) {
        Long companyId = companyContext.currentCompanyId();

        Employee employee=employeeRepository.findByIdAndCompanyId(employeeId, companyId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with given id doesn't exist: "+employeeId));

        employeeRepository.delete(employee);
    }


}
