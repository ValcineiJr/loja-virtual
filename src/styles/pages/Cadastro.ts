import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;
  max-width: 600px;

  margin: 0 auto;

  background-color: #eee;

  padding: 16px;

  input,
  select {
    width: 100%;

    margin: 5px;

    padding: 16px;

    border: 1px solid #000;
  }
`;
