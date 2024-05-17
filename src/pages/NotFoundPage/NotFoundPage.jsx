import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton.jsx'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">Страница не найдена</h1>
      <CustomButton onClick={handleGoHome}>Вернуться на главную</CustomButton>
    </div>
  )
}

export default NotFoundPage
