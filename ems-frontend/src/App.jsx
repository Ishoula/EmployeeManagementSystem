import ListEmployeeComponent from './components/ListEmployeeComponent.jsx'
import HeaderComponent from './components/HeaderComponent.jsx'
import './App.css'
import FooterComponent from './components/FooterComponent.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent.jsx'
import LoginComponent from './components/LoginComponent.jsx'
import SignupComponent from './components/SignupComponent.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className='app-shell'>
        <HeaderComponent />
        <main className='main-content'>
          <Routes>
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/signup' element={<SignupComponent />} />
            <Route path='/' element={<ProtectedRoute><ListEmployeeComponent /></ProtectedRoute>} />
            <Route path='/employees' element={<ProtectedRoute><ListEmployeeComponent /></ProtectedRoute>} />
            <Route path='/add-employee' element={<ProtectedRoute><EmployeeComponent /></ProtectedRoute>} />
            <Route path='/edit-employee/:id' element={<ProtectedRoute><EmployeeComponent /></ProtectedRoute>} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App
