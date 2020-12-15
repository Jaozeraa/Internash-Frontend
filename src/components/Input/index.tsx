import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core'

import {
  Container,
  TextHelp,
  Error
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  textHelp?: string;
  containerStyle?: object;
  isDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({isDisabled=false, containerStyle={}, name,label, textHelp, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value'
    })
  }, [fieldName, registerField])

  return (
    
    <Container isDisabled={isDisabled} style={containerStyle} hasError={!!error} htmlFor={name}>
      <label htmlFor={name}>{label}</label>
        <input 
          disabled={isDisabled}
          defaultValue={defaultValue}
          ref={inputRef} 
          id={name} 
          type="text" 
          {...rest}
        />
      {error ? (
        <Error>
          {error}
        </Error> 
      ) : (
        <TextHelp>{textHelp}</TextHelp>
        )}
    </Container>
  )
}

export default Input;