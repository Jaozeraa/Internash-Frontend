import React from 'react';
import {
  Container,
  UserItem
} from './styles';
import { useConnection } from '../../../../hooks/connection'
import avatarImg from '../../../../assets/Avatar.svg'

const Connections: React.FC = () => {
  const { connections } = useConnection();

  return (
    <Container>
      {connections.map(connection => (
        <UserItem key={connection.id}>
          <img src={connection.user.avatar_url || avatarImg} alt={connection.user.name}/>
          <section>
            <h5>{connection.user.name.length > 12 ? `${connection.user.name.substring(0, 12)}...` : connection.user.name}</h5>
            <p>{connection.user.skill.length > 12 ? `${connection.user.skill.substring(0,12)}...` : connection.user.skill}</p>
          </section>
        </UserItem>
      ))}
    </Container>
  )
}

export default Connections;