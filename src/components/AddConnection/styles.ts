import styled from 'styled-components';

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