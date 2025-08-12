import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const courseName = ['React', 'ReactNative', 'NodeJS', 'ExpressJS']

  // Array people đã có sẵn
  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9}, 
    {name: 'John', age: 40}, 
    {name: 'Ann', age: 19}, 
    {name: 'Elisabeth', age: 16}
  ]

  // Function để check teenager (age >= 10 and age <= 20)
  const isTeenager = (person) => person.age >= 10 && person.age <= 20

  // 1. Find the first person is teenager
  const firstTeenager = people.find(isTeenager)

  // 2. Find all persons are teenagers
  const allTeenagers = people.filter(isTeenager)

  // 3. Check if every person is teenager (true/false)
  const everyPersonIsTeenager = people.every(isTeenager)

  // 4. Check if any person is teenager (true/false)
  const anyPersonIsTeenager = people.some(isTeenager)

  return (
    <>
      <div>
        <h1>Course List</h1>
        <ul>{
          courseName.map(courseName => (
            <li key={courseName}>{courseName}</li>
          ))}
          </ul>

        <hr />
        <h1>People Array Analysis</h1>
        
        <h3>1. First teenager found:</h3>
        <p>{firstTeenager ? `${firstTeenager.name} (${firstTeenager.age} years old)` : 'No teenager found'}</p>

        <h3>2. All teenagers:</h3>
        <ul>
          {allTeenagers.length > 0 ? 
            allTeenagers.map(person => (
              <li key={person.name}>{person.name} ({person.age} years old)</li>
            )) :
            <li>No teenagers found</li>
          }
        </ul>

        <h3>3. Every person is teenager:</h3>
        <p><strong>{everyPersonIsTeenager.toString()}</strong></p>

        <h3>4. Any person is teenager:</h3>
        <p><strong>{anyPersonIsTeenager.toString()}</strong></p>

        <h3>All people with status:</h3>
        <ul>
          {people.map(person => (
            <li key={person.name}>
              {person.name} ({person.age} years old) - 
              <span style={{color: isTeenager(person) ? 'green' : 'red'}}>
                {isTeenager(person) ? ' ✓ Teenager' : ' ✗ Not teenager'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
