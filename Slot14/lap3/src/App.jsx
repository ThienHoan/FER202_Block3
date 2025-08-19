import { useState, useEffect } from 'react'
import NavigationBar from './components/Navbar'
import StudentsPage from './components/StudentsPage'
import Footer from './components/Footer'
import ProfileForm from './components/ProfileForm'
import { students } from './students'
import './App.css'

function App() {
  const [quickSearchTerm, setQuickSearchTerm] = useState('')
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [allStudents, setAllStudents] = useState(students)

  // Load profiles from localStorage on component mount
  useEffect(() => {
    const loadProfilesFromStorage = () => {
      const storedProfiles = JSON.parse(localStorage.getItem('studentProfiles') || '[]')
      setAllStudents([...students, ...storedProfiles])
    }

    loadProfilesFromStorage()

    // Listen for new profile additions
    const handleProfileAdded = (event) => {
      const newProfile = event.detail
      setAllStudents(prevStudents => [...prevStudents, newProfile])
    }

    window.addEventListener('profileAdded', handleProfileAdded)

    return () => {
      window.removeEventListener('profileAdded', handleProfileAdded)
    }
  }, [])

  const handleQuickSearch = (searchTerm) => {
    setQuickSearchTerm(searchTerm)
  }

  const handleShowProfileForm = () => {
    setShowProfileForm(true)
  }

  const handleHideProfileForm = () => {
    setShowProfileForm(false)
  }

  return (
    <div className="App">
      <NavigationBar 
        onQuickSearch={handleQuickSearch} 
        onShowProfileForm={handleShowProfileForm}
      />
      <StudentsPage students={allStudents} quickSearchTerm={quickSearchTerm} />
      <ProfileForm show={showProfileForm} onHide={handleHideProfileForm} />
      <Footer />
    </div>
  )
}

export default App
