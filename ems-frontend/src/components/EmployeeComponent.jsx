import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService.js'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
  const navigator = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const { id } = useParams()
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          setEmail(response.data.email)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [id])

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const employee = { firstName, lastName, email }
      if (id) {
        updateEmployee(id, employee)
          .then(() => {
            navigator('/employees')
          })
          .catch((error) => console.error(error))
      } else {
        createEmployee(employee)
          .then(() => {
            navigator('/employees')
          })
          .catch((error) => console.error(error))
      }
    }
  }

  function validateForm() {
    let valid = true
    const errorsCopy = { ...errors }
    if (firstName.trim()) {
      errorsCopy.firstName = ''
    } else {
      errorsCopy.firstName = 'First name is required'
      valid = false
    }

    if (lastName.trim()) {
      errorsCopy.lastName = ''
    } else {
      errorsCopy.lastName = 'Last name is required'
      valid = false
    }

    if (email.trim()) {
      errorsCopy.email = ''
    } else {
      errorsCopy.email = 'Email is required'
      valid = false
    }

    setErrors(errorsCopy)
    return valid
  }

  const pageCopy = id
    ? {
        subtitle: 'Edit profile',
        title: 'Update employee',
        description: 'Modify employee details and keep records aligned with your latest information.'
      }
    : {
        subtitle: 'New teammate',
        title: 'Add employee',
        description: 'Create a profile to welcome someone new to the organisation.'
      }

  return (
    <section className='page-section'>
      <div className='page-header'>
        <div>
          <p className='subtitle'>{pageCopy.subtitle}</p>
          <h1 className='title'>{pageCopy.title}</h1>
          <p className='description'>{pageCopy.description}</p>
        </div>
      </div>

      <div className='card shadow-soft mt-4'>
        <div className='card-body p-4 p-md-5'>
          <form>
            <div className='form-group mb-4'>
              <label className='form-label' htmlFor='firstName'>First name</label>
              <input
                id='firstName'
                type='text'
                placeholder='e.g. Jane'
                name='firstName'
                value={firstName}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
            </div>

            <div className='form-group mb-4'>
              <label className='form-label' htmlFor='lastName'>Last name</label>
              <input
                id='lastName'
                type='text'
                placeholder='e.g. Doe'
                name='lastName'
                value={lastName}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
            </div>

            <div className='form-group mb-4'>
              <label className='form-label' htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                placeholder='e.g. jane.doe@company.com'
                name='email'
                value={email}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
            </div>

            <div className='form-actions'>
              <button type='button' className='btn btn-light-soft btn-pill' onClick={() => navigator('/employees')}>
                Cancel
              </button>
              <button type='submit' className='btn btn-gradient btn-pill' onClick={saveOrUpdateEmployee}>
                {id ? 'Save changes' : 'Create employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EmployeeComponent
