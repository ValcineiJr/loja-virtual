import styled from 'styled-components';

export const Container = styled.div`
  background: white;

  padding: 16px;
  margin-bottom: 30px;

  border-radius: 5px;

  .resumo {
    p {
      font-size: 1.8rem;

      margin-bottom: 10px;
    }
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.6rem;
    color: #0f1111;

    padding-bottom: 5px;
  }

  .total {
    .ligh {
      color: #0f1111;
      font-size: 1.8rem;
      font-weight: bold;

      margin-top: 10px;
    }
  }

  .card {
    margin: 20px 0%;
  }

  .header {
    display: flex;
    gap: 20px;

    margin-bottom: 10px;
  }

  .number,
  .title,
  .frete {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text_alternative};
    font-weight: bold;
  }

  .cart {
    .item {
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 5px;
      gap: 20px;
      display: flex;

      margin: 10px 0;

      .info {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      input {
        border: 1px solid rgb(222, 224, 228);
        width: 50px;

        text-align: center;

        font-weight: bold;
        font-size: 1.6rem;
      }

      .name,
      .price {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.text_alternative};
      }

      .name {
        font-weight: bold;
      }

      .item-img {
        min-height: 80px;
        min-height: 80px;

        max-width: 80px;
        max-width: 80px;

        img {
          min-height: 80px;
          min-height: 80px;

          max-width: 80px;
          max-width: 80px;
        }
      }
    }
  }
`;
