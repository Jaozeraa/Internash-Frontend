import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  green?: boolean
}

const Button: React.FC<ButtonProps> = ({ green = false, children, ...rest }) => {
  return (
    <Container green={green} {...rest}>
      {children}
    </Container>
  )
}

export default Button;