import { useEffect, useState } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }    
    const reset = () => {
        setValue('')
    }
    return { type, value, onChange, reset }

}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    const config = {
        headers: { 'Content-Type': 'application/json',
                   'Authorization': 'JWT fefege...' },
    }
    useEffect(() => {
        axios
        .get(baseUrl, config)
        .then(response => setResources(response.data))
        .catch((error) => console.log(error))
    }, [baseUrl])
    const create = (resource) => {
        axios
        .post(baseUrl, resource, config)
        .then(response => setResources([...resources, response.data]))
        .catch((error) => console.log(error))
    }
    const service = { create }
    return [resources, service]
}