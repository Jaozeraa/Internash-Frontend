import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import { useToast } from '../../hooks/toast'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { 
  Container,
  UserItem,
  UsersContainer,
  DoubleInput
} from './styles';
import Button from '../Button';
import api from '../../services/api';
import avatarImg from '../../assets/Avatar.svg'
import Input from '../Input';
import getValidationErrors from '../../utils/getValidationErrors';


interface AddEmployeeProps {
  isOpen: boolean
  setIsOpen: () => void;
  project_id: string
  handleSubmit(): void;
}

interface User {
  id: string;
  email: string;
  name: string;
  skill: string;
  avatar_url: string;
}

interface Page2Data {
  status: string;
  payment: number;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ isOpen, setIsOpen, project_id, handleSubmit }) => {
  const { addToast } = useToast()
  const [selectedUser, setSelectedUser] = useState<User>({} as User)
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState('1')
  const formRef = useRef<FormHandles>(null)

  useEffect(() => {
    async function getData() {
      const response = await api.get('/users')
      setUsers(response.data)
    }

    getData()
  }, [])

  const handleChangeSelectedUser = useCallback((user: User) => {
    setSelectedUser(user)
  }, [])

  const handleToggleModal = useCallback(() => {
    setIsOpen()
    setSelectedUser({} as User)
    setPage('1')
  }, [setIsOpen])

  const handleSubmitPage1 = useCallback(() => {
    if(!selectedUser.id) {
      return addToast({
        title: 'É preciso selecionar um usuário para continuar',
        type: 'info',
        time: 'medium'
      })
    }
    setPage('2')
  }, [selectedUser, addToast])

  const handleSubmitPage2 = useCallback(async (data: Page2Data) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        status: yup.string().required('Cargo Obrigatório'),
        payment: yup.string().required('Pagamento obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

console.log(selectedUser)

      await api.post(`/employees/${project_id}`, {
        payment: data.payment,
        status: data.status,
        user_id: selectedUser.id
      })

      handleToggleModal()

      handleSubmit()

      addToast({
        title: `${selectedUser.name} agora faz parte do projeto!`,
        type: 'success',
        time: 'medium'
      })

      
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {
        addToast({
          title: 'Ocorreu um erro ao adicionar este integrante! Tente novamente',
          type: 'error',
          time: 'medium'
        })

      }
    }
  }, [addToast, handleToggleModal, handleSubmit, project_id, selectedUser]);

  return (
    <Modal noPadding setIsOpen={handleToggleModal} isOpen={isOpen}>
      {page === '1' && (
        <Container>
          <h3>Escolha um usuário</h3>
          <UsersContainer>
            {users.map(user => (
              <UserItem onClick={() => handleChangeSelectedUser(user)} selected={user.id === selectedUser.id}>
                <img src={user.avatar_url || avatarImg} alt={user.name}/>
                <section>
                  <h5>{user.name.length > 12 ? `${user.name.substring(0, 12)}...` : user.name}</h5>
                  <p>{user.skill.length > 12 ? `${user.skill.substring(0,12)}...` : user.skill}</p>
                </section>
              </UserItem>
            ))}
          </UsersContainer>
          <Button onClick={handleSubmitPage1} className="next" green>Continuar</Button>
        </Container>
      )}
      {page === '2' && (
        <Container>
          <h3>Adicionar integrante</h3>
          <Form 
              noValidate
              ref={formRef}
              onSubmit={handleSubmitPage2}
            >
              <DoubleInput>
                <Input placeholder='Digite o cargo' containerStyle={{ width: 280, marginRight: 16 }} label='Cargo' name='status'/>
                <Input placeholder='Digite o pagamento' containerStyle={{ width: 240 }} label='Pagamento' name='payment'/>
              </DoubleInput>
              <Button className="next" green>Adicionar</Button>
            </Form>
        </Container>
      )}
    </Modal>
  )
}

export default AddEmployee;