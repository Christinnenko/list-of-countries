import React from 'react'
import Button from 'react-bootstrap/Button'

function CustomButton({ children, onClick }) {
  return (
    <Button variant="primary" onClick={onClick}>
      {children}
    </Button>
  )
}

export default CustomButton
