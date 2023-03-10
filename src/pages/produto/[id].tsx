/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import { Container } from '@/styles/pages/Product';

import formatter from '@/utils/CurrencyFormatter';
import { FreteData } from '../api/frete/[cep]';

import { TailSpin } from 'react-loader-spinner';

import api from '@/services/api';
import CustomModal from '@/components/CustomModal';

import { useProduct } from '@/hooks/useProduct';
import { gamesType } from '@/contexts/ProductContext';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { child, get, getDatabase, ref } from 'firebase/database';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useFetch } from '@/hooks/useFetch';

const produto = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [cep, setCep] = useState(``);

  const [loadingCep, setLoadingCep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [freteList, setFreteList] = useState<FreteData[]>([]);

  // const { id } = router.query;
  // const { data } = useFetch<gamesType>(
  //   `api/product/read/product/${id}`,
  //   setLoading,
  // );

  const { categories, addItemsToRecents } = useProduct();
  const { cart, setCartToStorage, setFrete } = useCart();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  async function handleCalculateShipping() {
    if (cep.length === 8) {
      setLoadingCep(true);
      localStorage.setItem(`cep`, cep);
      const { data } = await api.get(`api/frete/${cep}`);

      if (data) {
        setLoadingCep(false);
        setFreteList([data]);
      }
    }
  }

  function handleAddItemToCart() {
    onOpenModal();
    setCartToStorage(data as gamesType);
  }

  useEffect(() => {
    if (data) {
      addItemsToRecents(data);
    }
  }, [addItemsToRecents, data]);

  return (
    <Layout>
      <CustomModal open={open} setOpen={setOpen}>
        <>
          <h2>Produto adicionado com sucesso!</h2>
          <div className="buttons">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onCloseModal();
              }}
              className="site-button"
            >
              Continuar comprando
            </a>
            <Link className="site-button-fill" href={`/carrinho`}>
              Ir para carrinho
            </Link>
          </div>
        </>
      </CustomModal>

      {loading || !data ? (
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
      ) : (
        <>
          <Container>
            <div className="wrapper">
              <div className="image">
                <img className="banner" src={data.banner} alt="" />
              </div>

              <div className="separator">
                <div className="info">
                  <p>{data.name}</p>
                  <p>{formatter(data.price)}</p>
                  <button onClick={handleAddItemToCart} className="site-button">
                    Comprar
                  </button>
                </div>

                <div>
                  <p>Compra 100% segura.</p>
                  <p>
                    Pagamentos auditados pelo
                    <span className="bold">PayPal</span>
                  </p>
                </div>

                <div className="frete">
                  <p>Calcule o frete</p>
                  <div className="input">
                    <input
                      value={cep}
                      maxLength={8}
                      onChange={(e) => setCep(e.target.value)}
                      type="text"
                      placeholder="CEP"
                    />
                    <button onClick={handleCalculateShipping}>Calcular</button>
                  </div>
                  {loadingCep && (
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
                  {freteList.length > 0 && (
                    <ul className="frete-box">
                      {freteList.map((item) => (
                        <li key={`Correios SEDEX`}>
                          <span>{item.Valor}</span>
                          <strong>{item.PrazoEntrega} dias uteis</strong>
                          <span>Correios SEDEX</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="message">
              <p>
                Os prazos anunciados acima s??o previs??es aproximadas de acordo
                com informa????es repassadas pela empresa transportadora, podendo
                variar para mais ou para menos.
              </p>
            </div>
          </Container>
          <Container>
            <div className="container">
              <h2>Infoma????es importantes</h2>
              <ul className="important">
                <li>
                  As imagens dos produtos e/ou seus componentes s??o meramente
                  ilustrativos, exceto quando indicado o contr??rio no pr??prio
                  an??ncio;
                </li>
                <li>
                  Este ?? um item de cat??logo, ou seja, um produto comum no
                  mercado e que normalmente possui v??rias unidades em estoque.
                </li>
                <li>
                  O estado de conserva????o de cada unidade do estoque pode
                  variar, mas todos os produtos funcionam perfeitamente!
                </li>
              </ul>

              <h2>Descri????o do produto</h2>
              <p style={{ textAlign: `justify` }}>{data.description}</p>

              <h2>Especifica????es</h2>

              <ul className="espec">
                <li>
                  <span className="bold">Desenvolvedora:</span>
                  {/* {data.gameSpecifications.developer} */}
                </li>
                <li>
                  <span className="bold">Publicadora:</span>
                  {data.gameSpecifications.publisher}
                </li>
                <li>
                  <span className="bold">Data de lan??amento:</span>
                  {data.gameSpecifications.releaseDate}
                </li>
                <li>
                  <span className="bold">Idiomas:</span>
                  {data.gameSpecifications.languages}
                </li>
                <li>
                  <span className="bold">Legendas:</span>
                  {data.gameSpecifications.subtitles}
                </li>
                <li>
                  <span className="bold">Idade recomendada:</span>
                  {data.gameSpecifications.age}
                </li>
                <li>
                  <span className="bold">G??nero(s):</span>
                  {data.gameSpecifications.genre.map((item) => `${item}, `)}
                </li>
                <li>
                  <span className="bold">N??mero de jogadores offline:</span>
                  {data.gameSpecifications.numberOfPlayersOffline}
                </li>
                <li>
                  <span className="bold">N??mero de jogadores online:</span>
                  {data.gameSpecifications.numberOfPlayersOnline}
                </li>
              </ul>

              <h2>Garantia</h2>
              <p>1 ano contra defeitos de fabrica????o.</p>

              <h2>Itens inclusos</h2>
              <ul className="espec">
                <li>Midia</li>
                <li>Encarte</li>
              </ul>

              <h2>Requisitos / Compatibilidade</h2>
              <ul className="espec">
                <li>
                  {categories
                    ?.filter((item) => item.id === data.sub_category_id)[0]
                    ?.name.replace(`-`, ` `)}
                </li>
              </ul>
            </div>
          </Container>
        </>
      )}

      <h3
        style={{
          fontSize: `3rem`,
          color: `#1b1b1b`,
          textAlign: `center`,
          margin: `20px 0`,
        }}
      >
        Produtos relacionados
      </h3>

      <Container></Container>
    </Layout>
  );
};

export default produto;

export async function getStaticPaths() {
  let dataArray: gamesType[] = [];

  const dbRef = ref(getDatabase());

  const response = await get(child(dbRef, `products/`));
  if (response.exists()) {
    dataArray = Object.values(response.val());
  }

  const paths = dataArray.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps<{
  data: gamesType;
}> = async (context) => {
  const id = context.params?.id;
  const dbRef = ref(getDatabase());
  let data;

  const response = await get(child(dbRef, `products/${id}`));

  if (response.exists()) {
    data = response.val();
  }

  return {
    // Passed to the page component as props
    props: { data },
  };
};
