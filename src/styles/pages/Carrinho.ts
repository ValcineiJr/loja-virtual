import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .wrapper {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 2.6rem;
  }

  .resume,
  .cep,
  .cart,
  .recent-products {
    padding: 16px;
    background-color: white;
    border-radius: 5px;

    display: flex;
    flex-direction: column;

    margin-bottom: 20px;

    .header p {
      font-size: 2.6rem;
    }
  }

  .cep {
    .loading {
      display: flex;

      margin-top: 20px;

      justify-content: center;
    }

    .frete-box {
      li {
        display: flex;
        align-items: center;

        input {
          margin-right: 4%;
        }

        .separator {
          width: 100%;
          display: flex;
          justify-content: space-between;

          font-size: 1.6rem;
        }
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

      margin-top: 10px;

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

  .recent-products {
    .name {
      line-height: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  aside {
    .header p {
      font-size: 2.6rem;
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 1.6rem;

      margin: 10px 0;

      .value {
        font-weight: bold;
      }
    }

    .item {
      display: flex;
      gap: 20px;

      margin: 10px 0;
      padding-bottom: 20px;

      border-bottom: 1px solid #ddd;

      .img-product {
        flex: 1;

        /* background-color: red; */

        img {
          height: 100px;
          width: 180px;

          object-fit: contain;
        }
      }
      .info {
        flex: 1;
        font-size: 1.6rem;
        /* background-color: red; */
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 7px;

        .name {
          font-weight: bold;
        }

        .site-button {
          height: 40px;
          font-size: 1.8rem;

          span {
            margin-right: 10px;
          }
        }
      }
    }
  }

  section {
    .exclude {
      width: 100%;
    }
  }

  .cart {
    gap: 20px;

    padding: 16px;

    .header {
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .price-text {
        font-size: 2rem;
      }
    }

    .item {
      display: flex;
      position: relative;
      padding-top: 40px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;

      .img-product {
        /* background-color: red !important; */
        flex: 1;

        img {
          object-fit: contain;
        }
      }

      &:last-child {
        border: none;
      }
      /* background-color: yellow; */

      .name-product {
        font-size: 1.8rem;
        line-height: 16px;
        padding: 20px 0;
        font-weight: bold;

        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      label {
        font-size: 1.6rem;
      }

      input {
        border: 1px solid rgb(222, 224, 228);
        width: 50px;

        text-align: center;

        font-weight: bold;
        font-size: 1.6rem;
      }

      .price {
        position: absolute;
        right: 0;
        top: 0;

        font-size: 2rem;
      }
    }

    .separator {
      display: flex;
      justify-content: center;
      width: 100%;

      /* background-color: pink; */

      .info {
        display: flex;
        flex-direction: column;
        flex: 1;

        /* background-color: red; */

        width: 100%;

        text-align: center;

        .options {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          /* background-color: green; */

          height: 100%;
          width: 100%;

          .quantity {
            /* background-color: orange; */
            /* height: 30px; */

            button {
              max-height: 30px !important;
              font-size: 2rem;
            }
          }

          .separator {
            display: flex;
          }

          input {
            width: 40px;
            text-align: center;
          }
        }
      }
    }

    .img-product {
      width: 180px;
      height: 180px;

      img {
        width: 180px;
        height: 180px;
      }
    }
  }
`;
