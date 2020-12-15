import styled from 'styled-components';

export const Container = styled.div`
  width: 1216px;
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 32px;
  grid-template-columns: auto auto auto auto;

  > h4 {
    font-family: 'Maven Pro';
    font-weight: bold;
    font-size: 32px;
    line-height: 38px;
  }
`;

export const UserItem = styled.button`
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