import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

import logoImg from '../../assets/LogoWhite.svg'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { 
  Container,
  TextContainer,
  FormContainer
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface LoginData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { logIn } = useAuth()

  const handleSubmit = useCallback(async (data: LoginData) => {
    try {
      formRef.current?.setErrors({}); 
      const schema = yup.object().shape({
        email: yup.string().email('E-mail inválido').required('E-mail Obrigatório'),
        password: yup.string().required('Senha obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await logIn({
        email: data.email,
        password: data.password
      })

      addToast({
        title: 'Logado com sucesso! Bem vindo',
        type: 'success',
        time: 'short'
      })

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {

        if (error.response.data.message === 'Email/password combination invalid.') {
          return addToast({
            title: 'E-mail / Senha inválido!',
            type: 'error',
            time: 'short'
          })
        }
        
        addToast({
          title: 'Erro na autenticação! Tente novamente',
          type: 'error',
          time: 'short'
        })

      }
    }
  }, [addToast, logIn]);
  
  return (
    <Container>
      <body>
        <TextContainer>
          <div>
            <img src={logoImg} alt="Internash"/>
            <h1>Faça seu login<br/>na plataforma</h1>
          </div>
        </TextContainer>
        <FormContainer>
          <div>
            <Form 
              noValidate
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <Input label="E-mail" placeholder='Digite seu e-mail' name="email" type="email" />
              <Input containerStyle={{ marginTop: 16 }} label="Senha" placeholder='Digite sua senha' name="password" type="password" />
              <Button>Entrar</Button>
            </Form>
            <Link to="/signin">Criar uma conta</Link>
          </div>
        </FormContainer>
      </body>
    </Container>
  )
}

export default Login;
