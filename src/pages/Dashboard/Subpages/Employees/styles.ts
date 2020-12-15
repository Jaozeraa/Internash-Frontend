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

export const Projects = styled.aside`
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

export const EmployeesContainer = styled.section`
  display: flex;
  width: 780px;
  flex-direction: column;
  margin-top: -32px;
`;

export const EmployeesListHeader = styled.header`
  display: grid;
  grid-template-rows: 80px;
  grid-template-columns: repeat(3, auto) 89px;
  width: 100%;

  > strong {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
`;

export const EmployeeItem = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto) 89px;
  background: #FFFFFF;
  box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.02);
  border-radius: 6px;
  padding: 12px;
  transition: .2s;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 10px 25px 10px rgba(0, 0, 0, 0.05);
  }

  & + div {
    margin-top: 14px;
  }
`;

export const EmployeeProfile = styled.div`
  display: flex;

  > img {
    border-radius: 50%;
    width: 56px;
    height: 56px;
    margin-right: 16px;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 4px;

    > strong {
      font-weight: 500;
      margin-bottom: 8px;
    }

    > * {
      display: block;
    }
  }
`;

export const EmployeeIncoming = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

export const EmployeeStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > strong {
    font-weight: 500;
    margin-bottom: 8px;
  }

  > strong {
    text-align: left;
  }

  > * {
    display: block;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    background: transparent;
    border: 0;
    transition: filter .3s ease;
    
    & + button {
      margin-left: 6px;
    }

    &:hover {
      filter: brightness(40%);
    }
  }
`;

