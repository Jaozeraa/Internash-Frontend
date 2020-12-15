import React, { useCallback, useRef } from 'react';
import Modal from '../Modal';
import { useNotification } from '../../hooks/notification'

import { 
  Container,
  Content,
  Notification
} from './styles';


interface AddConnectionProps {
  isOpen: boolean
  setIsOpen: () => void;
}

const AddConnection: React.FC<AddConnectionProps> = ({ isOpen, setIsOpen }) => {
  const { notifications, setAllRead } = useNotification()

  const handleToggleModal = useCallback(() => {
    setAllRead()
    setIsOpen()
  }, [setAllRead, setIsOpen])

  return (
    <Modal noPadding setIsOpen={handleToggleModal} isOpen={isOpen}>
      <Container>
        <h3>Notificações</h3>
        <Content>
          {notifications.map(notification => (
            <Notification read={notification.read} key={notification.id}>
              <h4>{notification.title}</h4>
              <h5>{notification.description}</h5>
              <p>{notification.formattedDate}</p>
            </Notification>
          ))}
        </Content>
      </Container>
    </Modal>
  )
}

export default AddConnection;