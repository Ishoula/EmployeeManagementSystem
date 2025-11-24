import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton.jsx'
import { isAuthenticated } from '../utils/auth.js'

const HeaderComponent = () => {
  return (
    <header className='app-header'>
      <nav className='navbar glass-nav'>
        <div className='container d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-3'>
          <Link to={isAuthenticated() ? '/employees' : '/'} className='navbar-brand'>Employee Management System</Link>
          <span className='navbar-text'>Manage employees</span>
          {isAuthenticated() && <LogoutButton />}
        </div>
      </nav>
    </header>
  )
}

export default HeaderComponent
