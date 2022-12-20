/* eslint-disable @next/next/no-img-element */
import formatter from '@/utils/CurrencyFormatter';
import { gamesType } from '@/utils/dummyData';
import Link from 'next/link';
import React, { useState } from 'react';

import ReactPaginate from 'react-paginate';

import { Container, ItemsContainer, MyPaginate } from './styles';

type PaginationProps = {
  itemsPerPage: number;
  items: any[];
};

const Pagination = ({ itemsPerPage, items }: PaginationProps) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  function Items({ currentItems }: any) {
    return (
      <ItemsContainer>
        {currentItems &&
          currentItems.map((item: gamesType, index: number) => (
            <Link href={`/produto/${item.id}`} key={String(index)}>
              <div className="item">
                <div className="image">
                  <img src={item.banner} alt="" />
                </div>
                <div className="info">
                  <p className="name">{item.name}</p>
                  <p className="price">{formatter(item.price)}</p>
                  <button className="site-button">Comprar</button>
                </div>
              </div>
            </Link>
          ))}
      </ItemsContainer>
    );
  }
  return (
    <Container>
      <Items currentItems={currentItems} />
      <div className="pages">
        <MyPaginate
          breakLabel="..."
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=""
          renderOnZeroPageCount={() => null}
        />
      </div>
    </Container>
  );
};

export default Pagination;
