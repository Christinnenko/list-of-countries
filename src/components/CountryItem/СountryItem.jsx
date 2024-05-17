import React from 'react'

function CountryItem({ countryName }) {
  return (
    <li className="country-item">
      <p>{countryName}</p>
    </li>
  )
}

export default CountryItem
