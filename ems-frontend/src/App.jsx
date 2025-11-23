import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import './App.css'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {
  return (
    <BrowserRouter>
      <div className='app-shell'>
        <HeaderComponent />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<ListEmployeeComponent />} />
            <Route path='/employees' element={<ListEmployeeComponent />} />
            <Route path='/add-employee' element={<EmployeeComponent />} />
            <Route path='/edit-employee/:id' element={<EmployeeComponent />} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App
