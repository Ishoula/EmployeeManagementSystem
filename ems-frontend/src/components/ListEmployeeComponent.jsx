import React ,{useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

  const [employees, setEmployee]= useState([])
  const navigator=useNavigate()

  useEffect(() => {
    getAllEmployees()
  },[])

  function addNewEmployee(){
    navigator('/add-employee')
  }
  function getAllEmployees(){
    listEmployees().then((response)=>{
        setEmployee(response.data)
    }).catch(error=>{
        console.error("Error loading employee data: ",error)
    })

  }

   function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
  }

  function removeEmployee(id){
    console.log(id)

    deleteEmployee(id).then((response)=>{
        
    }).catch(error=>{
        console.error(error)
    })
  }
    return (
        <div className='container '>
            <h2>List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-bordered'>
               <thead>
                <tr className='table-primary'>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                    
                </tr>
               </thead>
               <tbody>
                {
                    employees.map(employee=>
                        <tr key={employee.id} className='table-info'>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
               </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent
