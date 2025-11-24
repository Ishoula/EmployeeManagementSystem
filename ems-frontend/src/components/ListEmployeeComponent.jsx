import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../service/EmployeeService.js'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
  const [employees, setEmployee] = useState([])
  const navigator = useNavigate()

  useEffect(() => {
    getAllEmployees()
  }, [])

  function addNewEmployee() {
    navigator('/add-employee')
  }

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployee(response.data)
      })
      .catch((error) => {
        console.error('Error loading employee data: ', error)
      })
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`)
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => {
        setEmployee((prev) => prev.filter((employee) => employee.id !== id))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <section className='page-section'>
      <div className='page-header'>
        <div>
          <p className='subtitle'>Team directory</p>
          <h1 className='title'>Employee roster</h1>
          <p className='description'>Manage your team members, track contact details, and keep records tidy.</p>
        </div>
        <button className='btn btn-gradient btn-pill shadow-soft text-white' onClick={addNewEmployee}>
          + Add employee
        </button>
      </div>

      <div className='card card-table mt-4'>
        {employees.length > 0 ? (
          <div className='table-responsive'>
            <table className='table align-middle'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>First name</th>
                  <th scope='col'>Last name</th>
                  <th scope='col'>Email</th>
                  <th scope='col' className='text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <span className='status-badge'>#{employee.id}</span>
                    </td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                      <div className='action-group justify-content-end'>
                        <button className='action-button action-button--edit' onClick={() => updateEmployee(employee.id)}>
                          <span className='icon-chip'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.8' stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487a2.1 2.1 0 0 1 2.97 2.97l-9.83 9.83a4.2 4.2 0 0 1-1.506.94l-3.097 1.033 1.033-3.097a4.2 4.2 0 0 1 .94-1.506l9.49-9.49z' />
                              <path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 2.651 2.651' />
                            </svg>
                          </span>
                          Edit
                        </button>
                        <button className='action-button action-button--delete' onClick={() => removeEmployee(employee.id)}>
                          <span className='icon-chip'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.8' stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.108 1.022.169m-1.022-.17L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.11 48.11 0 0 0-3.478-.397m-12 .562c.34-.061.68-.117 1.022-.17m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0' />
                            </svg>
                          </span>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='empty-state'>
            <h3>No employees yet</h3>
            <p>Create your first employee profile to start building your directory.</p>
            <button className='btn btn-gradient btn-pill' onClick={addNewEmployee}>
              Add employee
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ListEmployeeComponent
