import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    useEffect(() => {
        if (name) {
            axios
            .get(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                setCountry({...response.data[0], found: true})
            })
            .catch((error) => {
                setCountry({found: false})
            })
        }
    }, [name])
    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }
    return { type, value, onChange }
}