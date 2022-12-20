import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import { Container } from '@/styles/pages/Products';
import Pagination from '@/components/Pagination';

import { useProduct } from '@/hooks/useProduct';
import { gamesType } from '@/contexts/ProductContext';

import { TailSpin } from 'react-loader-spinner';

const Products: React.FC = () => {
  const router = useRouter();
  const { category, subcategory }: any = router.query;
  const formattedsubcategory = subcategory?.replace(`-`, ` `);

  const [gameList, setGameList] = useState<gamesType[]>([]);
  const [loading, setLoading] = useState(false);

  const [filteredGameList, setFilteredGameList] = useState<gamesType[]>([]);

  const { getAllProducts, categories } = useProduct();

  useEffect(() => {
    async function getData() {
      await getAllProducts(setGameList, setLoading);
    }

    getData();
  }, []);

  useEffect(() => {
    const filteredCategories = categories?.filter(
      (item) => item.name === subcategory,
    );

    setFilteredGameList(
      gameList.filter(
        (item) => item?.sub_category_id === filteredCategories[0]?.id,
      ),
    );
  }, [categories, category, gameList, subcategory]);

  return (
    <Layout>
      <Container>
        <div className="menu">
          <ul>
            <li className="bold" onClick={() => console.log(categories)}>
              Página Inicial
            </li>
            <span>{`>`}</span>
            <li className="bold">{category}</li>
            <span>{`>`}</span>
            <li>{formattedsubcategory}</li>
          </ul>
        </div>

        {/* <select name="" id="">
          <option value="none">Escolher ordem</option>
          <option value="none">Mais antigo</option>
        </select> */}
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
        {!loading && filteredGameList.length === 0 ? (
          <div className="empty-content">
            <p>Nenhum game encontrado para essa plataforma.</p>
          </div>
        ) : (
          <Pagination itemsPerPage={4} items={filteredGameList} />
        )}
      </Container>
    </Layout>
  );
};

export default Products;
