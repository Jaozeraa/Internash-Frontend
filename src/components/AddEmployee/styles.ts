import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  background: #F8F9FA;

  >h3 {
    margin-bottom: 24px;
  }

  button.next {
    margin-top: 32px;
    width: 140px;
    align-self: flex-end;
  }
`;

export const UsersContainer = styled.section`
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 32px;
  grid-template-columns: auto auto auto;
`

interface UserItemProps {
  selected: boolean;
}

export const UserItem = styled.button<UserItemProps>`
  display: flex;
  height: 80px;
  width: 220px;
  border-radius: 6px;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.02);
  padding: 0 16px;
  align-items: center;
  transition: border-color .4s;

  ${props => props.selected && css`
    border-color: #F0918D;
  `}

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 16px;
  }

  > section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    > h5 {
      font-family: 'Maven Pro';
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
    }

    > p {
      font-family: 'Maven Pro';
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #ADB5BD;
    }
  }
`

export const DoubleInput = styled.div`
  display: flex;

  & + div {
    margin-top: 16px;
  }
`