import React, { useCallback, useRef } from 'react';
import Modal from '../Modal';
import { useToast } from '../../hooks/toast'
import { useConnection } from '../../hooks/connection'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { 
  Container,
} from './styles';
import Input from '../Input';
import Button from '../Button';
import getValidationErrors from '../../utils/getValidationErrors';


interface AddConnectionProps {
  isOpen: boolean
  setIsOpen: () => void;
}

interface AddConnectionData {
  email: string
}

const AddConnection: React.FC<AddConnectionProps> = ({ isOpen, setIsOpen }) => {
  const { addToast } = useToast()
  const { addConnection } = useConnection()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: AddConnectionData) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        email: yup.string().email('E-mail inválido').required('E-mail Obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await addConnection(data.email)

      setIsOpen()

      addToast({
        title: 'Parabéns você fez uma nova conexão!',
        type: 'success',
        time: 'medium'
      })
      
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {
        if (error.response.data.message === 'You can`t add yourself') {
          return addToast({
            title: 'Você não pode se adicionar!',
            type: 'error',
            time: 'short'
          })
        }

        if (error.response.data.message === 'This user id is invalid') {
          return addToast({
            title: 'Nenhum usuário encontrado!',
            type: 'error',
            time: 'short'
          })
        }
        
        addToast({
          title: 'Erro ao adicionar este usuário! Tente novamente',
          type: 'error',
          time: 'medium'
        })

      }
    }
  }, [setIsOpen, addConnection, addToast])

  return (
    <Modal noPadding setIsOpen={setIsOpen} isOpen={isOpen}>
      <Container>
        <h3>Procurar usuário</h3>
        <Form 
              noValidate
              ref={formRef}
              onSubmit={handleSubmit}
            >
          <Input label="" placeholder='Digite o email do usuário' name="email" type="email" containerStyle={{width: 460}}/>
          <Button green>Adicionar</Button>
        </Form>
      </Container>
    </Modal>
  )
}

export default AddConnection;