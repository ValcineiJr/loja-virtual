import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;

  border-radius: 5px;

  padding: 16px;

  .box {
    width: 100%;

    margin: 10px 0;
  }

  h1,
  h2 {
    text-align: center;
  }

  h1 {
    font-size: 3.6rem;
    font-weight: bold;

    margin-bottom: 20px;
  }

  h2 {
    font-size: 2.2rem;
  }
`;
