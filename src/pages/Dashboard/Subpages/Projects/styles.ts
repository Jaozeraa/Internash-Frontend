import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1216px;
`;

export const FirstLine = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;

  > h4 {
    font-family: 'Maven Pro';
    font-weight: bold;
    font-size: 32px;
    line-height: 38px;
  }

  > button {
    background: linear-gradient(76.88deg, #ED76A8 0%, #F0918D 100%);
    border-radius: 20px;
    border: 0;
    height: 44px;
    width: 150px;
    font-family: 'Maven Pro';
    font-weight: 500;
    font-size: 20px;
    color: #F8F9FA;
  }
`

export const Content = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const ProjectsContainer = styled.aside`
  padding: 16px 16px;
  background: #FFFFFF;
  border-radius: 6px;
  box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.02);
  height: fit-content;
`

interface ProjectProps {
  selected: boolean;
}

export const Project = styled.button<ProjectProps>`
  width: 340px;
  height: 68px;
  background: transparent;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border: 0;
  transition: .4s;

  &:hover {
    background: #F8F9FA;
  }

  > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 16px;
    border: 1px solid #E9ECEF;
  }

  > p {
    font-family: 'Maven Pro';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }

  ${props => props.selected && css`
    background: #E9ECEF;

    &:hover {
    background: #E9ECEF;
  }
  `}
`;

export const NoProjectsMessage = styled.p`
  margin: auto;
`;

export const ProjectContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 780px;

  > img {
    object-fit: cover;
    height: 280px;
    border-radius: 6px;
    border: 2px solid #E9ECEF;
    margin-bottom: 16px;
  }

  > h5 {
    font-family: 'Maven Pro';
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 16px;
  }

  > p {
    font-family: 'Maven Pro';
    font-weight: 400;
    font-size: 18px;
    color: #ADB5BD;
  }
`