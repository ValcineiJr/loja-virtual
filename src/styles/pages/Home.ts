import styled from 'styled-components';

export const Container = styled.div`
  z-index: -1 !important;

  .carossel {
  }
  .img-container {
    width: 372px;
    height: 372px;

    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .conteiner {
    margin-top: 50px;

    ul {
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      align-items: center;

      position: relative;

      li {
        display: flex;
        align-items: center;
        gap: 10px;

        color: ${({ theme }) => theme.colors.primary};
        font-size: 3rem;

        p {
          color: ${({ theme }) => theme.colors.text_alternative};
          font-size: 1.6rem !important;
        }
      }
    }

    @media (max-width: 767px) {
      ul {
        flex-flow: wrap;

        padding: 0;
      }

      li {
        width: 45%;

        justify-content: left;

        margin: 5px auto !important;
      }
    }
  }

  .popular {
    margin-top: 50px;

    h2 {
      font-size: 3rem;
      text-transform: uppercase;
      text-align: center;

      margin-bottom: 10px;
    }

    ul {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      margin-bottom: 10px;

      li {
        text-transform: capitalize;
        font-size: 1.5rem;

        transition: all 0.6s;
      }

      button {
        padding: 18px 18px;

        background-color: transparent;

        font-family: 'Poppins';
      }
    }

    .products {
      display: grid;

      justify-content: center;

      grid-template-columns: repeat(auto-fit, 350px);
      grid-gap: 20px;

      .product {
        display: flex;
        flex-direction: column;

        align-items: center;

        text-align: center;

        background-color: #fff;
        padding-bottom: 30px;

        /* max-height: 419px; */

        .img {
          max-width: 350px;
          max-height: 350px;
          border-radius: 5px;
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }

        .product-name {
          margin: 10px 0;

          font-size: 2rem;
          color: ${({ theme }) => theme.colors.text_alternative};
        }
        .product-price {
          font-size: 2rem;
          font-weight: bold;
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  .discover {
    margin-top: 50px;

    display: flex;
    align-items: center;

    .separator {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    img {
      flex: 1;
      max-width: 400px;
    }

    .subtitle {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.text_secondary};
      margin-bottom: 10px;

      max-width: 502px;
    }

    h2 {
      font-size: 3rem;
      text-transform: uppercase;
      text-align: left;

      margin-bottom: 10px;
    }

    a {
      border: 1px solid ${({ theme }) => theme.colors.primary};

      padding: 16px;
      margin-right: auto;

      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.primary};

      transition: all 0.6s;
    }

    a:hover {
      background-color: ${({ theme }) => theme.colors.primary};

      color: white;
    }

    @media (max-width: 767px) {
      flex-direction: column;
      img {
        flex: 1;
        order: -1;
        margin-bottom: 10px;
      }
    }
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 18px;
  }

  .item-carossel {
    margin-top: 50px;

    .button {
      width: 100%;

      display: flex;

      height: 30px;

      margin-top: 10px;

      a {
        border: 1px solid ${({ theme }) => theme.colors.primary};

        margin: 0 auto;
        padding: 16px;

        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.primary};

        transition: all 0.6s;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: transparent;
      }

      a:hover {
        background-color: ${({ theme }) => theme.colors.primary};

        color: white;
      }
    }

    h2 {
      font-size: 3rem;
      text-transform: uppercase;
      text-align: center;

      margin-bottom: 10px;

      color: ${({ theme }) => theme.colors.text_alternative};
    }

    .product-name {
      margin: 10px 0;

      font-size: 2rem;
      color: ${({ theme }) => theme.colors.text_alternative};
    }
    .product-price {
      font-size: 2rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .item-container {
    display: flex;
    flex-direction: column;
    height: 300px;

    /* background-color: red; */

    img {
      min-height: 215px;
    }

    align-items: center;

    .product-name {
      font-size: 2rem;
      text-align: center;
    }
    .product-price {
      font-size: 1.8rem;
    }
  }
`;
