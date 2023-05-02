import React, {useState} from "react";
const PersonForm = ({add, persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNewName, handleNewNumber}) => {
  
    return (
      <form onSubmit={add}>
        <div> name: <input value={newName} onChange={handleNewName}/> </div>
        <div> number: <input value={newNumber} onChange={handleNewNumber} /> </div>
        <div><button type="submit">add</button></div>
      </form>
    )
  }
  
export default PersonForm