package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Company;
import net.javaguides.ems.entity.Employee;

public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getCompany() != null ? employee.getCompany().getId() : null
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto, Company company){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail(),
                company
        );
    }

}
