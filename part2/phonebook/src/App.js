import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Service from './Services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const handleNewName = event => {
    setNewName(event.target.value)
  }
  const [newNumber, setNewNumber] = useState('')
  const handleNewNumber = event => {
    setNewNumber(event.target.value)
  }
  const [filterName, setFilterName] = useState('')
  const handleFilterName = event => {
      setFilterName(event.target.value)
  }
  useEffect( () => { 
    Service
    .getAll()
    .then(response => {
      console.log(response.data) 
      setPersons(response.data)
    })
  }, []) 
  const filterPersons = persons ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) : []

  const add = event => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert (`${newName} is already added to the phonebook`)
    } else {
      const nameObject = {name: newName, id: persons.length + 1, number: newNumber}
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
      <PersonForm add={add} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />
    </div>
  )
}

export default App
