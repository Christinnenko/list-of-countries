import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CountriesListPage from './pages/CountriesListPage/CountriesListPage.jsx';
import CountryCard from './pages/CountryCard/CountryCard.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CountriesListPage />} />
      <Route path="/country/:countryName" element={<CountryCard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
