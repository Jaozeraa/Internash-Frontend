import styled, { keyframes } from 'styled-components';
import bg from '../../assets/Background.svg'
// import { shade } from 'polished'

const appearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
`

export const Container = styled.div`
  display: flex;
  background: url(${bg}) no-repeat center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;

  > body {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1008px;
    animation: ${appearFromRight} 1s;
    background: transparent;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;

  > div {
    margin-left: 32px;

    > h1 {
      margin: 24px 0 16px;
      color: #01B88F;
    }

    > a {
      text-decoration: none;

      > span {
        display: flex;
        align-items: center;

        > img {
          margin-right: 8px;
        }

        > p {
          font-family: 'Maven Pro';
          font-weight: 500;
          font-size: 14px;
          line-height: 150%;
          color: #212529;
          transition: .4s;
        }
      }
    }
  }
`

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: #fff;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    margin-right: 32px;

    > form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 420px;

      a {
        color: #ED76A8;
        font-weight: 500;
        font-family: 'Maven Pro';
        font-size: 14px;
        margin: 16px 0;
        align-self: flex-start;
        text-decoration: none;
        transition: color .4s;
      }
    }
    > a {
      color: #ED76A8;
      font-family: 'Maven Pro';
      font-size: 20px;
      font-weight: 600;
      line-height: 25px;
      text-align: center;
      text-decoration: none;
      margin-top: 16px;
      transition: color .4s;
    }
  }

`;
