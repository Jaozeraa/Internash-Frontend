import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  background: #F8F9FA;

  >h3 {
    margin-bottom: 24px;
  }

  >form {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      margin-top: 24px;
      width: 140px;
      align-self: flex-end;
    }
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
`

interface NotificationProps {
  read: boolean
}

export const Notification = styled.div<NotificationProps>`
  width: 320px;
  padding: 16px 8px;
  background: #E9ECEF;
  border-radius: 6px;

  & + div{
    border-top: 2px solid #ADB5BD;
  }

  > h5 {
    font-family: 'Maven Pro';
    font-weight: normal;
    font-size: 18px;
    line-height: 150%;
  }

  > p {
    font-family: 'Maven Pro';
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    opacity: 50%;
  }
  
  ${props => props.read && css`
    background: #F8F9FA;
  `}

`