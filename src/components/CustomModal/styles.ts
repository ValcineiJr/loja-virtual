import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  .email {
    height: 40px;
    padding: 16px;

    width: 100%;

    font-family: 'Poppins';

    font-size: 1.6rem;

    border: 1px solid #cecece;
    border-radius: 5px;

    margin-top: 10px;
  }

  h2 {
    font-size: 2rem;
  }
  .close {
    position: absolute;
    right: -25px;
    top: -25px;

    padding: 0;

    background-color: ${({ theme }) => theme.colors.primary};

    font-size: 6rem;
    color: white;

    display: flex;

    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;

    border-radius: 15px;
  }

  a {
    margin: 10px 0 !important;
    border-radius: 5px;
  }
  p {
    font-size: 1.6rem;
  }
`;
