import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError: boolean;
  isDisabled: boolean;
}

export const Container = styled.label<ContainerProps>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;  

  ${props => props.isDisabled && css`
      > input {
        background: #fff !important;
        opacity: 50%;
        cursor: auto;
      }
  `}

  > label {
    font-size: 16px;
    color: #212529;
    font-family: 'Maven Pro';
    line-height: 125%;
    font-weight: 400;
    margin-bottom: 8px;
    display: flex;
  }

  > input {
    border: 1px solid rgba(173, 181, 189, 0.30);
    font-weight: 400;
    height: 56px;
    border-radius: 5px;
    transition: all .4s;
    padding: 0 16px;
    background: transparent;
    font-size: 16px;
    color: #212529;
    font-family: 'Maven Pro';
    line-height: 150%;
    width: 100%;

    &::placeholder {
      color: #868e96;
    }

    &:focus-within {
      border-color: #F0918D;
      box-shadow: 0px 3px 10px rgba(114, 30, 255, 0.1);
    }

    ${props => props.hasError && css`
      border-color: #ff0000;
    `}
  }
`;

export const TextHelp = styled.p`
  margin-top: 8px;
  font-family: 'Maven Pro';
  font-size: 14px;
  font-weight: 400;
  color: #868E96;
`

export const Error = styled.p`
  font-family: 'Maven Pro';
  font-size: 14px;
  font-weight: 500;
  color: #ff0000;
  margin-top: 8px;
`