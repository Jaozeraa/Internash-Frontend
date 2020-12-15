import styled, { css } from 'styled-components';

interface ButtonProps {
  green: boolean;
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  height: 56px;
  border-radius: 6px;
  border: 0;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  background: linear-gradient(76.88deg, #ED76A8 0%, #F0918D 100%);
  color: #fff;

  ${props => props.green && css`
    background: #26DEB1;
    -webkit-text-fill-color: #fff;
  `}
`;
