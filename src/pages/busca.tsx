import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';

import { Container } from '@/styles/pages/Busca';
import { useProduct } from '@/hooks/useProduct';
import { gamesType } from '@/contexts/ProductContext';
import { TailSpin } from 'react-loader-spinner';

const Busca: React.FC = () => {
  const router: any = useRouter();
  const searchTerm: string = router.query?.q;

  const [gameList, setGameList] = useState<gamesType[]>([]);
  const [filteredGamesList, setFilteredGamesList] = useState<gamesType[]>([]);
  const [loading, setLoading] = useState(false);

  const { getAllProducts } = useProduct();

  useEffect(() => {
    async function getData() {
      await getAllProducts(setGameList, setLoading);
    }

    getData();
  }, []);

  useEffect(() => {
    setFilteredGamesList(
      gameList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm?.toLowerCase()),
      ),
    );
  }, [gameList, searchTerm]);

  return (
    <Layout>
      <Container>
        <div className="menu">
          <ul>
            <li className="bold">Página Inicial</li>
            <span>{`>`}</span>
            <li className="bold">Resultado da busca</li>
            <span>{`>`}</span>
            <li>{searchTerm}</li>
          </ul>
        </div>

        {loading && (
          <div className="loading">
            <TailSpin
              height="40"
              width="40"
              color="#D90429"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}

        {!loading && filteredGamesList.length === 0 ? (
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
