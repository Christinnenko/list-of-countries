import React, { useState, useEffect } from 'react'
import CountryItem from '../../components/CountryItem/СountryItem.jsx'

function CountriesListPage() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        if (!response.ok) {
          throw new Error('Failed to fetch countries')
        }
        const data = await response.json()
        setCountries(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <ul className="countries-list">
      {countries.length > 0 &&
        countries.map((country, index) => (
          <CountryItem key={index} countryName={country.name.common} />
        ))}
    </ul>
  )
}

export default CountriesListPage
