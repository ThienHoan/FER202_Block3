import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const courseName = ['React', 'ReactNative', 'NodeJS', 'ExpressJS']

  return (
    <>
      <div>
        <h1>Course List</h1>
        <ul>{
          courseName.map(courseName => (
            <li key={courseName}>{courseName}</li>
          ))}
          </ul>

      </div>
    </>
  )
}

export default App
