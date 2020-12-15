import React, { useCallback, useEffect, useState } from 'react';

import { 
  Container, 
  Content, 
  LeftSide, 
  RightSide, 
  Navigation, 
  NavOption,
  RoundButton,
  AvatarButton
 } from './styles';
import logoImg from '../../assets/Logo.svg'
import addImg from '../../assets/Add Friends.svg'
import avatarImg from '../../assets/Avatar.svg'
import notificationsImg from '../../assets/Notifications.svg'
import { useAuth } from '../../hooks/auth'
import { useNotification } from '../../hooks/notification'
import { useToast } from '../../hooks/toast'
import AddConnection from '../AddConnection';
import Notifications from '../Notifications';

interface HeaderProps {
  selectedPage: string
  handleChangePage(page: string): void
}

const Header: React.FC<HeaderProps> = ({ selectedPage, handleChangePage }) => {
  const { logOut, user, verifyToken } = useAuth()
  const { badge } = useNotification()
  const { addToast } = useToast()
  const [addConnection, setAddConnection] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    try {
        verifyToken()
    } catch {
        logOut()
        addToast({
            title: 'Login expirado! Entre novamente',
            type: 'info',
            time: 'medium'
        })
    }
  }, [addToast, verifyToken, logOut])

  const handleAddConnection = useCallback(() => {
    setAddConnection(state => !state)
  }, [])

  const handleNotification = useCallback(() => {
    setNotification(state => !state)
  }, [])

  return (
    <Container>
      <Content>
        <LeftSide>
          <img src={logoImg} alt="Internash"/>
          <Navigation>
            <NavOption onClick={() => handleChangePage('employees')} selected={selectedPage === 'employees'}>
              Integrantes
            </NavOption>
            <NavOption onClick={() => handleChangePage('connections')} selected={selectedPage === 'connections'}>
              Conexões
            </NavOption>
            <NavOption onClick={() => handleChangePage('projects')} selected={selectedPage === 'projects'}>
              Projetos
            </NavOption>
          </Navigation>
        </LeftSide>
        <RightSide>
          <RoundButton title='Adicionar' onClick={handleAddConnection} badge={false}>
            <img src={addImg} alt="Add Friends"/>
          </RoundButton>
          <AddConnection setIsOpen={handleAddConnection} isOpen={addConnection}/>
          <RoundButton title='Notificações' onClick={handleNotification} badge={badge}>
            <img src={notificationsImg} alt="Notifications"/>
          </RoundButton>
          <Notifications setIsOpen={handleNotification} isOpen={notification}/>
          <AvatarButton onClick={logOut} src={user.avatar_url || avatarImg} alt={user.name}/>
        </RightSide>
      </Content>
    </Container>
  )
}

export default Header;