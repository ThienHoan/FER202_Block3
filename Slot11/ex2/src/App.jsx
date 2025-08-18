import { useState } from 'react'
import NavigationBar from './components/Navbar'
import StudentsPage from './components/StudentsPage'
import Footer from './components/Footer'
import { students } from './students'
import './App.css'

function App() {
  const [quickSearchTerm, setQuickSearchTerm] = useState('')

  const handleQuickSearch = (searchTerm) => {
    setQuickSearchTerm(searchTerm)
  }

  return (
    <div className="App">
      <NavigationBar onQuickSearch={handleQuickSearch} />
      <StudentsPage students={students} quickSearchTerm={quickSearchTerm} />
      <Footer />
    </div>
  )
}

export default App
