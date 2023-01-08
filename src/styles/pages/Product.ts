import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;

  display: flex;
  flex-direction: column;

  .wrapper {
    display: flex;
    flex-direction: column;

    @media (min-width: 767px) {
      flex-direction: row;

      .image {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-width: 276px;
        }
      }

      .separator {
        display: flex;
        flex: 2;
        flex-direction: column;

        .info {
          justify-items: flex-start;
        }

        /* background-color: red; */
      }
    }
  }

  h3 {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.text_alternative};
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 4%;

    p {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.text_alternative};
      font-weight: bold;

      margin: 10px 0;
    }

    button {
      font-size: 2rem;
      width: 100%;
    }
  }

  p {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text_secondary};
    text-align: center;
  }

  .bold {
    color: ${({ theme }) => theme.colors.text_alternative} !important;
  }

  .frete {
    display: flex;
    flex-direction: column;
    padding: 4%;

    margin-top: 20px;

    .loading {
      display: flex;

      margin-top: 20px;

      justify-content: center;
    }

    .frete-box {
      li {
        display: flex;
        justify-content: space-between;

        font-size: 1.6rem;
      }

      margin-top: 20px;
      padding: 4%;

      border: 1px solid #cecece;
      border-radius: 5px;
    }

    p {
      font-size: 2rem !important;
      text-align: left;
      color: ${({ theme }) => theme.colors.text_alternative} !important;

      margin-bottom: 10px;
    }

    .input {
      width: 100%;
      position: relative;

      border: 1px solid #cecece;
      border-radius: 5px;

      input {
        padding-left: 16px;
        height: 50px;
        width: 100%;

        font-family: 'Poppins';
        font-size: 2rem;
      }

      button {
        position: absolute;
        right: 16px;
        top: 8px;

        font-family: 'Poppins';

        background: ${({ theme }) => theme.colors.primary};
        color: white;
        padding: 8px;

        border-radius: 5px;
      }
    }
  }

  .message {
    padding: 4%;
    p {
      text-align: left;
    }
  }

  .container {
    padding: 4%;

    display: flex;

    flex-direction: column;

    .espec {
      border: 1px solid #cecece;
    }

    .espec > li {
      width: 100%;
      padding: 15px;
      color: #25262c;
      font-weight: 700;

      font-size: 1.4rem;

      text-transform: capitalize;

      .bold {
        color: #8f8f8f !important;
        margin-right: 5px;
      }
    }

    .espec > li:nth-child(odd) {
      background: #f3f2f2;
    }

    p {
      text-align: left;
      line-height: 24px;
    }

    h2 {
      font-size: 2rem;

      margin: 10px 0;
    }
    .important {
      padding: 4%;
      list-style: decimal;
      display: flex;
      flex-direction: column;

      gap: 20px;

      li {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.text_secondary};
      }
    }
  }
`;
