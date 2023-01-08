import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';

import { Container } from '@/styles/pages/Busca';

import { gamesType } from '@/contexts/ProductContext';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { child, get, getDatabase, ref } from 'firebase/database';

const Busca = ({
  gameList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router: any = useRouter();
  const searchTerm: string = router.query?.q;

  const [filteredGamesList, setFilteredGamesList] = useState<gamesType[]>([]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredGamesList(
        gameList.filter((item) =>
          item.name.toLowerCase().includes(searchTerm?.toLowerCase()),
        ),
      );
    } else {
      setFilteredGamesList(gameList);
    }
  }, [gameList, searchTerm]);

  return (
    <Layout>
      <Container>
        <div className="menu">
          <ul>
            <li className="bold">Página Inicial</li>
            <span>{`>`}</span>
            <li className="bold">Resultado da busca</li>
            {searchTerm && (
              <>
                <span>{`>`}</span>
                <li>{searchTerm}</li>
              </>
            )}
          </ul>
        </div>

        {filteredGamesList.length === 0 ? (
          <div className="empty-content">
            <p>Nenhum game encontrado.</p>
          </div>
        ) : (
          <Pagination itemsPerPage={3} items={filteredGamesList} />
        )}
      </Container>
    </Layout>
  );
};

export default Busca;

export const getServerSideProps: GetServerSideProps<{
  gameList: gamesType[];
}> = async ({ res }) => {
  res.setHeader(
    `Cache-Control`,
    `public, s-maxage=10, stale-while-revalidate=59`,
  );

  let gameList: gamesType[] = [];

  const dbRef = ref(getDatabase());

  const response = await get(child(dbRef, `products/`));
  if (response.exists()) {
    gameList = Object.values(response.val());
  }

  return {
    props: {
      gameList,
    },
  };
};
