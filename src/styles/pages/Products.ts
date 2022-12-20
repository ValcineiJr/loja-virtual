import styled from 'styled-components';

export const Container = styled.div`
  .loading {
    flex: 1;

    display: flex;

    align-items: center;
    justify-content: center;

    height: 300px;
  }
  .menu {
    ul {
      display: flex;
      gap: 10px;

      font-size: 1.4rem;

      align-items: center;

      li {
        text-transform: capitalize;
        color: ${({ theme }) => theme.colors.text_secondary};
      }

      .bold {
        color: ${({ theme }) => theme.colors.text_alternative} !important;
      }

      span {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 2rem;
      }
    }
  }

  .empty-content {
    margin-top: 100px;

    p {
      font-size: 2rem;
      text-align: center;
      font-weight: bold;
    }
  }

  select {
    border: 0;
    outline: none;
    background: #fff;

    font-family: 'Poppins';

    font-size: 18px;

    padding: 5px;
    margin-top: 20px;

    color: ${({ theme }) => theme.colors.text_alternative};
  }
`;
