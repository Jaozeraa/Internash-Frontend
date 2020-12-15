import styled, { css } from 'styled-components';

export const Container = styled.header`
  height: 80px;
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.section`
  width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LeftSide = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    margin-right: 40px;
  }
`

export const RightSide = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface NavOptionProps {
  selected: boolean;
}

export const NavOption = styled.button<NavOptionProps>`
  position: relative;
  font-family: 'Maven Pro';
  font-weight: 500;
  font-size: 22px;
  line-height: 28px;
  color: #ADB5BD;
  border: 0;
  background: transparent;
  transition: .4s;

  &:hover {
    color: #212529;
  }

  &::after{
    content: '';
    position: absolute;
    bottom: -26px;
    border-radius: 6px;
    left: 0;
    display: none;
    height: 2px;
    width: 100%;
    background: #ED76A8;
  }

  ${props => props.selected && css`
    color: #212529;

    &::after{
      display: flex;
    }
  `}

  & + button {
    margin-left: 24px;
  }
`

interface RoundButtonProps {
  badge: boolean
}

export const RoundButton = styled.button<RoundButtonProps>`
  position: relative;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .2s;

  &:hover {
    background: #E9ECEF;
  }

  & + button {
    margin-left: 16px;
  }

  &::before {
    display: none;
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 8px;
    right: 8px;
    z-index: 1;
    background: #01B88F;

    ${props => props.badge && css`
      display: block;
    `}
  }
`

export const AvatarButton = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-position: right;
  object-fit: cover;
  margin-left: 40px;
  cursor: pointer;
`