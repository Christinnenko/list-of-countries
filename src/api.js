//документация: https://restcountries.com/

const baseUrl = 'https://restcountries.com/v3.1/all'

fetch(baseUrl)
  .then((response) => response.json())
  .then((data) => {
    const country = data[0]

    const countryData = {
      name: country.name.common,
      capital: country.capital[0] || '-',
      flag: country.flags.svg || '-',
    }

    console.log(countryData)
  })
  .catch((error) => {
    console.error('Ошибка при получении данных о стране:', error)
  })
