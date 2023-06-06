import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Service from './Services/notes'
import './index.css'

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
      // setPersons(response)
      const personsData = response.data;
      setPersons(personsData);
    })
    .catch(error => console.log('Error'))
  }, []) 
  const filterPersons = persons ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) : []

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      Service
      .remove(id)
      .then(() => { setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
  const add = event => {
    event.preventDefault() 
    const person = persons.find(person => person.name === newName)
    const nameExists = persons.some(person => person.name === newName)
    const numberExists = persons.some(person => person.number === newNumber)
    if (nameExists && numberExists) {
      alert (`${newName} and ${newNumber } are already added to the phonebook`)
    } else if (nameExists && numberExists == false) {
      const confirm = window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number?`)
      if (confirm) {
        const updatePerson = {...person, number: newNumber}
        Service
        .update(person.id,updatePerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response))
          setNewName('')
          setNewNumber('')
        })
      } else {
        alert (`This name already has a phone number. Try another one`)
        setNewName('')
        setNewNumber('')
      }
    } else {
      const nameObject = {name: newName, id: persons.length + 1, number: newNumber}
      Service
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
      })
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
      <PersonForm add={add} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
