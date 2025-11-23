import React from 'react'

const HeaderComponent = () => {
  return (
    <header className='app-header'>
      <nav className='navbar glass-nav'>
        <div className='container d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-3'>
          <a href='https://www.linkedin.com/in/ishema-shimwa-shoulamite-a43b25218/' className='navbar-brand'>Employee Management System</a>
          <span className='navbar-text'>Manage employees</span>
        </div>
      </nav>
    </header>
  )
}

export default HeaderComponent
