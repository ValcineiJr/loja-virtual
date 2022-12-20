import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

export const ItemsContainer = styled.div`
  display: grid;

  justify-content: center;

  grid-template-columns: repeat(auto-fit, minmax(170px, 300px));

  padding: 20px 0;

  grid-gap: 20px;

  .image {
    border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  }

  .item {
    background-color: #fff;
    border-radius: 5px;

    padding: 0 4%;
    padding-bottom: 4%;

    font-size: 1.6rem;
    text-align: center;

    .name,
    .price {
      margin: 10px 0;

      font-weight: bold;
      color: ${({ theme }) => theme.colors.text_alternative};
    }

    .info {
      button {
        padding: 8px !important;
        width: 100%;
        margin: 0 auto;
      }
    }
  }
`;

export const Container = styled.div`
  .pages {
    display: flex;
  }
`;

export const MyPaginate = styled(ReactPaginate).attrs({
  // You can redefine classes here, if you want.
  activeClassName: `active`, // default to "selected"
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;

  list-style-type: none;

  padding: 0 5rem;
  margin: 0 auto;
  margin-bottom: 2rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;

    font-size: 1.6rem;

    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
