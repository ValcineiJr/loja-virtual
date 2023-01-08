import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import { Container } from '@/styles/pages/Products';
import Pagination from '@/components/Pagination';

import { useProduct } from '@/hooks/useProduct';
import { gamesType } from '@/contexts/ProductContext';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { child, get, getDatabase, ref } from 'firebase/database';

const Products = ({
  gameList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { category, subcategory }: any = router.query;
  const formattedsubcategory = subcategory?.replace(`-`, ` `);

  const [filteredGameList, setFilteredGameList] = useState<gamesType[]>([]);

  const { categories } = useProduct();

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

        {filteredGameList.length === 0 ? (
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
