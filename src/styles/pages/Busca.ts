import styled from 'styled-components';

export const Container = styled.div`
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
`;
