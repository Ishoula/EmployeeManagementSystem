import React from 'react'

const FooterComponent = () => {
  return (
    <footer className='footer'>
      <div className='footer-wave'>
        <svg viewBox='0 0 1440 200' preserveAspectRatio='none'>
          <path
            fill='rgba(148, 163, 184, 0.18)'
            d='M0 120C160 80 320 150 480 130C640 110 800 60 960 90C1120 120 1280 100 1440 120L1440 0H0Z'
          />
          <path
            fill='rgba(148, 163, 184, 0.26)'
            d='M0 150C120 140 240 90 360 110C480 130 600 210 720 196C840 182 960 132 1080 134C1200 136 1320 170 1380 164L1440 156V0H0Z'
          />
          <path
            fill='currentColor'
            d='M0 172C180 148 360 208 540 194C720 180 900 134 1080 150C1260 166 1350 200 1440 196V200H0Z'
          />
        </svg>
      </div>

      <div className='container footer-inner'>
        <div className='footer-brand'>
          <h3>Employee Management System</h3>
          <p>
            Empower your organisation with a streamlined employee directory, actionable insights, and tools that
            keep teams connected.
          </p>
          <div className='social-links'>
            <a className='social-icon linkedin' href='https://www.linkedin.com/in/ishema-shimwa-shoulamite-a43b25218/' aria-label='LinkedIn profile'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z' />
                <rect x='2' y='9' width='4' height='12' />
                <circle cx='4' cy='4' r='2' />
              </svg>
            </a>
            <a className='social-icon mail' href='mailto:contact@ems.co' aria-label='Email us'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                <polyline points='22,6 12,13 2,6' />
              </svg>
            </a>
          </div>
        </div>

        <div className='footer-links'>
          <h4>Quick links</h4>
          <ul>
            <li><a href='/employees'>Employee roster</a></li>
            <li><a href='/add-employee'>Add employee</a></li>
            <li><a href='/'>Dashboard</a></li>
          </ul>
        </div>

        <div className='footer-contact'>
          <h4>Contact</h4>
          <ul>
            <li><a href='mailto:support@ems.co'>support@ems.co</a></li>
            <li><a href='tel:+250780000000'>+250 780 000 000</a></li>
            <li><a href='https://goo.gl/maps/Example' target='_blank' rel='noreferrer'>Kigali, Rwanda</a></li>
          </ul>
        </div>
      </div>

      <div className='container footer-divider' />

      <div className='container footer-meta'>
        <span>© {new Date().getFullYear()} Shoula. All rights reserved.</span>
        <span className='foot-note'>Crafted with care</span>
      </div>
    </footer>
  )
}

export default FooterComponent
