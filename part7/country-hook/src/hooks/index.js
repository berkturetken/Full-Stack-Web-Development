import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (countryName) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        setCountry(response.data[0])
      })
      .catch(() => {
        setCountry(null)
      })
  }, [countryName])

  return country
}
