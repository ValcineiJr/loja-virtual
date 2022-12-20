/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useFetch } from '@/hooks/useFetch';

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

const produto: React.FC = () => {
  const router = useRouter();
  const [cep, setCep] = useState(``);

  const [loadingCep, setLoadingCep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [freteList, setFreteList] = useState<FreteData[]>([]);

  const { id } = router.query;
  const { data } = useFetch<gamesType>(
    `api/product/read/product/${id}`,
    setLoading,
  );

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
            <img src={data.banner} alt="" />
            <div className="info">
              <p>{data.name}</p>
              <p>{formatter(data.price)}</p>
              <button onClick={handleAddItemToCart} className="site-button">
                Comprar
              </button>
            </div>

            <p>Compra 100% segura.</p>
            <p>
              Pagamentos auditados pelo <span className="bold">PayPal</span>
            </p>

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

            <div className="message">
              <p>
                Os prazos anunciados acima são previsões aproximadas de acordo
                com informações repassadas pela empresa transportadora, podendo
                variar para mais ou para menos.
              </p>
            </div>
          </Container>
          <Container>
            <div className="container">
              <h2>Infomações importantes</h2>
              <ul className="important">
                <li>
                  As imagens dos produtos e/ou seus componentes são meramente
                  ilustrativos, exceto quando indicado o contrário no próprio
                  anúncio;
                </li>
                <li>
                  Este é um item de catálogo, ou seja, um produto comum no
                  mercado e que normalmente possui várias unidades em estoque.
                </li>
                <li>
                  O estado de conservação de cada unidade do estoque pode
                  variar, mas todos os produtos funcionam perfeitamente!
                </li>
              </ul>

              <h2>Descrição do produto</h2>
              <p style={{ textAlign: `justify` }}>{data.description}</p>

              <h2>Especificações</h2>

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
                  <span className="bold">Data de lançamento:</span>
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
                  <span className="bold">Gênero(s):</span>
                  {data.gameSpecifications.genre.map((item) => `${item}, `)}
                </li>
                <li>
                  <span className="bold">Número de jogadores offline:</span>
                  {data.gameSpecifications.numberOfPlayersOffline}
                </li>
                <li>
                  <span className="bold">Número de jogadores online:</span>
                  {data.gameSpecifications.numberOfPlayersOnline}
                </li>
              </ul>

              <h2>Garantia</h2>
              <p>1 ano contra defeitos de fabricação.</p>

              <h2>Itens inclusos</h2>
              <ul className="espec">
                <li>Midia</li>
                <li>Encarte</li>
              </ul>

              <h2>Requisitos / Compatibilidade</h2>
              <ul className="espec">
                <li>
                  {categories
                    .filter((item) => item.id === data.sub_category_id)[0]
                    .name.replace(`-`, ` `)}
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
