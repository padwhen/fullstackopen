import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

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
  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

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
