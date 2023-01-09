import styled from 'styled-components';

interface ContainerProps {
  toggle: boolean;
  toggleSubmenu: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;

  min-height: 100vh;

  header {
    background-color: ${({ theme }) => theme.colors.secondary};

    padding: 16px;

    display: flex;
    flex-direction: column;

    height: 160px;

    .header-wrapper {
      display: flex;
    }

    @media (min-width: 768px) {
      .row {
        .login {
          display: flex;
          align-items: center;
          gap: 20px;

          border: 1px #ccc solid;

          transition: all 0.6s;

          &:hover {
            border-color: ${({ theme }) => theme.colors.primary};
          }

          padding: 10px;

          border-radius: 10px;

          font-size: 1.4rem;

          color: white;

          margin-right: 40px;

          .icon {
            font-size: 2.4rem;
          }

          .color {
            color: ${({ theme }) => theme.colors.primary};
          }
        }

        /* background: green; */
      }

      padding-bottom: 0;

      flex-direction: row;
      align-items: center;

      .two,
      .one,
      .three {
        flex: 1 !important;
      }

      .two {
        flex: 2 !important;
      }

      .three {
        /* background-color: red; */
        display: flex;

        justify-content: flex-end !important;
      }

      .input {
        margin-top: 0 !important;
      }

      .mobile-cart {
        display: none !important;
      }

      .menu-mobile {
        display: none !important;
      }
    }

    .sub-menu {
      display: flex;
      flex-direction: column;

      z-index: 19;

      background: white;

      position: absolute;
      top: 160px;
      left: 0;

      width: 70%;
      height: calc(100% - 160px);

      transition: all 0.6s;

      transform: ${({ toggleSubmenu }) =>
        !toggleSubmenu ? `translateX(-100%)` : `translateX(0%)`};

      border-right: 1px solid ${({ theme }) => theme.colors.text_secondary};

      ul {
        width: 100%;
      }

      li {
        display: flex;

        width: 100%;

        border-bottom: 1px solid ${({ theme }) => theme.colors.text_secondary};

        span {
          display: flex;

          justify-content: space-between;
          align-items: center;
        }

        &:last-child {
          border: none;
        }

        a,
        .link {
          color: ${({ theme }) => theme.colors.text_alternative};
          font-size: 1.8rem;

          width: 100%;
          height: 100%;

          padding: 16px;

          font-weight: bold;
        }
      }

      button {
        background-color: rgba(143, 143, 143, 0.15);

        font-size: 1.8rem;

        width: 100%;

        padding: 16px;

        font-weight: bold;

        display: flex;
        gap: 10px;

        justify-content: flex-start;
      }
    }

    .row {
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        width: 100%;
      }

      .input {
        margin-top: 20px;

        width: 100%;

        background: white;

        position: relative;

        border-radius: 5px;

        input {
          padding: 16px;
          padding-right: 63px;

          width: 100%;

          border-radius: 5px;
        }

        .search-button {
          position: absolute;
          top: 2px;
          right: 16px;

          background: transparent;

          padding: 10px;

          font-size: 3rem;

          display: flex;
          align-items: center;
          justify-content: center;

          color: ${({ theme }) => theme.colors.text_alternative};
        }
      }
    }

    .brand {
      color: white;

      font-size: 3rem;

      line-height: 2.8rem;

      text-align: center;
    }

    .overlay {
      width: 100%;
      height: calc(100% - 160px);

      z-index: 19;

      transition: all 0.6s;

      display: ${({ toggle }) => (!toggle ? `none` : `flex`)};

      position: absolute;

      top: 160px;

      left: 0;

      background: rgba(0, 0, 0, 0.6);
    }

    nav {
      display: flex;
      z-index: 19;
      background: white;

      position: absolute;
      top: 160px;
      left: 0;

      width: 70%;
      height: calc(100% - 160px);

      transition: all 0.6s;

      transform: ${({ toggle }) =>
        !toggle ? `translateX(-100%)` : `translateX(0)`};

      border-right: 1px solid ${({ theme }) => theme.colors.text_secondary};

      ul {
        width: 100%;
      }

      li {
        display: flex;

        width: 100%;

        border-bottom: 1px solid ${({ theme }) => theme.colors.text_secondary};

        span {
          display: flex;

          justify-content: space-between;
          align-items: center;
        }

        &:first-child a {
          display: flex;
          gap: 20px;

          background-color: rgba(143, 143, 143, 0.15);
        }

        &:last-child {
          border: none;
        }

        a,
        .link {
          color: ${({ theme }) => theme.colors.text_alternative};
          font-size: 1.8rem;

          width: 100%;
          height: 100%;

          padding: 16px;

          font-weight: bold;
        }
      }

      .login-button {
        a {
          display: flex;
          align-items: center;
        }
      }
    }

    .menu {
      background-color: ${({ theme }) => theme.colors.primary};

      border: none;
      border-radius: 5px;

      padding: 10px 14px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 2.4rem;
      color: white;
    }
  }

  .three,
  .desktop-menu {
    display: none !important;

    @media (min-width: 768px) {
      display: flex !important;
    }
  }

  .desktop-menu {
    width: 100%;
    height: 50px;

    z-index: 9999;

    position: sticky;
    top: 0;

    background: ${({ theme }) => theme.colors.secondary};

    border-top: 4px solid ${({ theme }) => theme.colors.primary};

    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

    ul {
      display: flex;

      width: 100%;
      max-width: 1200px;
      margin: 0 auto;

      gap: 20px;

      li {
        display: flex;

        justify-content: center;
        align-items: center;

        flex: 1;
        height: 40px;

        font-size: 1.6rem;
        color: white;

        position: relative;

        transition: all 0.6s;

        &.menu {
          :nth-last-child(n + 2) {
            ::after {
              content: '|';
              position: absolute;
              right: 0;
              top: 10px;
            }
          }
        }

        position: relative;

        #show {
          opacity: 1;
          visibility: visible;
        }

        .sub-menu {
          visibility: hidden;
          opacity: 0;
          width: 100%;
          /* height: 300px; */

          transition: all 0.6s;

          background-color: ${({ theme }) => theme.colors.primary};

          position: absolute;
          top: 40px;

          z-index: 20;

          ul {
            display: flex;
            flex-direction: column;
            gap: 0;

            position: relative;

            #show {
              opacity: 1;
              visibility: visible;
            }

            .sub-sub-menu {
              visibility: hidden;
              opacity: 0;
              width: 100%;
              height: 300px;

              transition: all 0.6s;

              background-color: white;

              position: absolute;
              top: 0;
              left: 100%;

              z-index: 20;

              li {
                color: ${({ theme }) => theme.colors.text_alternative};
              }
            }

            li {
              flex: 1;
              padding: 10px;
              position: relative;
              display: flex;

              justify-content: flex-start;

              a {
                flex: 1;
                color: white;
              }

              &.sub {
                ::after {
                  content: '>';
                  position: absolute;
                  right: 10px;
                  top: 10px;
                }
              }
            }

            li:hover {
              background-color: white;

              color: ${({ theme }) => theme.colors.primary} !important;

              a {
                color: ${({ theme }) => theme.colors.primary} !important;
              }
            }
          }
        }

        cursor: pointer;

        span {
          display: flex;

          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .wrapper {
    width: 100%;
    max-width: 1200px;

    flex: 1 !important;

    padding: 10px 20px;
    margin: 0 auto;
  }
  .container {
    padding-top: 30px;
  }

  footer {
    display: flex;
    z-index: 9999;

    width: 100%;

    padding-top: 10px;
    margin-top: 50px;

    border-top: 1px solid ${({ theme }) => theme.colors.text_secondary};

    font-size: 1.4rem;

    .social {
      display: flex;
      flex-direction: column;

      margin-top: 10px;

      ul {
        display: flex;
        gap: 7px;
      }

      a {
        color: ${({ theme }) => theme.colors.text_alternative};
        font-size: 3rem;
      }
    }

    .wrapper {
      width: 100%;
      max-width: 1200px;

      margin: 0 auto;

      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`;
