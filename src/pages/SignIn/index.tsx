import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { useHistory, Link } from 'react-router-dom'
import * as yup from 'yup'

import logoImg from '../../assets/LogoWhite.svg'
import { useToast } from '../../hooks/toast'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { 
  Container,
  TextContainer,
  FormContainer
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignInData {
  email: string
  password: string
  name: string
  skill: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const { addToast } = useToast()

  const handleSubmit = useCallback(async (data: SignInData) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        email: yup.string().email('E-mail inválido').required('E-mail Obrigatório'),
        name: yup.string().required('Nome obrigatório').min(3, 'Nome curto demais'),
        password: yup.string().required('Senha obrigatória').min(5, 'Senha curta demais'),
        skill: yup.string().required('Qualificação obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', {
        email: data.email,
        password: data.password,
        name: data.name,
        skill: data.skill
      })

      addToast({
        title: 'Conta criada! Agora você pode logar',
        type: 'success',
        time: 'medium'
      })

      history.push('/')
      
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {
        if (error.response.data.message === 'This email is already taken.') {
          return addToast({
            title: 'E-mail já em uso!',
            type: 'error',
            time: 'short'
          })
        }
        
        addToast({
          title: 'Erro na criação de sua conta ! Tente novamente',
          type: 'error',
          time: 'medium'
        })

      }
    }
  }, [addToast , history]);
  
  return (
    <Container>
      <body>
      <FormContainer>
          <div>
            <Form 
              noValidate
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <Input label="Nome" placeholder='Digite seu nome' name="name" type="name" />
              <Input label="E-mail" placeholder='Digite seu e-mail' name="email" type="email" />
              <Input label="Qualificações" placeholder='Digite suas qualificações' name="skill" type="skill" />
              <Input containerStyle={{ marginTop: 16 }} label="Senha" placeholder='Digite sua senha' name="password" type="password" />
              <Button>Criar conta</Button>
            </Form>
            <Link to="/">Voltar para o login</Link>
          </div>
        </FormContainer>
        <TextContainer>
          <div>
            <img src={logoImg} alt="Internash"/>
            <h1>Crie sua conta<br/>é gratis</h1>
          </div>
        </TextContainer>
      </body>
    </Container>
  )
}

export default SignIn;
