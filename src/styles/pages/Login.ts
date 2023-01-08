import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;

  border-radius: 5px;

  padding: 16px;

  margin-bottom: 100px;

  h2 {
    font-size: 2.4rem;
    font-weight: bold;
    margin: 20px 0;
  }

  h3 {
    text-align: center;
    font-size: 2rem;
  }

  form {
    width: 100%;
  }

  .subtitle {
    font-size: 1.4rem;

    margin-bottom: 10px;
    text-align: right;

    text-decoration: underline;
  }
`;
