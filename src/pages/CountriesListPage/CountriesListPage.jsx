import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CountryItem from '../../components/CountryItem/СountryItem.jsx';
import PaginationBar from '../../components/PaginationBar/PaginationBar.jsx';
import Loader from '../../components/Loader/Loader.jsx';

function CountriesListPage() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 9; // Количество стран на странице

  //описание API: https://restcountries.com/
  //получение данных о стране
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to load the list of countries');
        }
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('Received an empty list of countries');
        }
        // Сортировка по алфавиту
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common),
        );
        setCountries(sortedCountries);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Определение индексов для отображения стран на текущей странице
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry,
  );

  // Изменение текущей страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container
      fluid
      className="bg-light d-flex flex-column justify-content-center align-items-center min-vh-100 p-4"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <div className="error-message">
              <p>An error occurred: {error}. Please try again later.</p>
            </div>
          ) : (
            <div className="w-100">
              <Row xs={1} md={2} lg={3} className="g-4">
                {currentCountries.map((country, index) => (
                  <Col key={index} className="mb-5">
                    <CountryItem countryName={country.name.common} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
          {!isLoading && !error && countries.length === 0 && (
            <div className="no-countries-message">
              <p>
                Unfortunately, the list of countries is empty. Please try again
                later.
              </p>
            </div>
          )}
          <div className="mt-4">
            {!error && (
              <PaginationBar
                countriesPerPage={countriesPerPage}
                totalCountries={countries.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </>
      )}
    </Container>
  );
}

export default CountriesListPage;
