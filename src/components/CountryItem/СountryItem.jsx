import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function CountryItem({ countryName }) {
  return (
    <Link to={`/country/${countryName}`} style={{ textDecoration: 'none' }}>
      <Card>
        <Card.Body style={{ cursor: 'pointer' }}>
          <Card.Title className="text-center pt-2">{countryName}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CountryItem;
