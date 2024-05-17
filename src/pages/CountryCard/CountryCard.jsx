import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader.jsx';

function CountryCard() {
  const { countryName } = useParams(); // Получаем countryName из URL
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGoHome = () => {
    navigate('/');
  };

  //описание API: https://restcountries.com/
  //получение данных о стране
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`,
        );
        if (!response.ok) {
          throw new Error('Не удалось загрузить информацию о стране');
        }
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('Страна не найдена');
        }
        setCountry(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  if (error) {
    return (
      <div>
        <p>Произошла ошибка: {error}. Пожалуйста, попробуйте позже.</p>
      </div>
    );
  }

  return (
    <div className="bg-light d-flex justify-content-center align-items-center vh-100">
      {isLoading ? (
        <Loader />
      ) : country ? (
        <Card style={{ width: '20rem' }}>
          <Card.Img
            variant="top"
            src={country.flags?.svg || 'Изображение флага отсутствует'}
            alt={`Флаг страны ${country.name.common}`}
          />
          <Card.Body>
            <Card.Title className="text-center fw-bold">
              {country.name.common}
            </Card.Title>
            <Card.Text>
              <span className="fw-bold">Официальное название:</span>{' '}
              {country.name.official || '-'}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">Столица:</span> {country.capital || '-'}
            </Card.Text>
            <div className="d-flex justify-content-center mt-4">
              <CustomButton onClick={handleGoHome}>
                Вернуться на главную
              </CustomButton>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p>Выбранная страна не найдена</p>
      )}
    </div>
  );
}

export default CountryCard;
