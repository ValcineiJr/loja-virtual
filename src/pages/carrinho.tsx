/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';

import Layout from '@/components/Layout';

import { Container } from '@/styles/pages/Carrinho';
import formatter from '@/utils/CurrencyFormatter';

import { FaShoppingCart } from 'react-icons/fa';

import { useCart } from '@/hooks/useCart';
import { useProduct } from '@/hooks/useProduct';
import api from '@/services/api';
import { FreteData } from './api/frete/[cep]';
import { TailSpin } from 'react-loader-spinner';
import Link from 'next/link';
import CustomModal from '@/components/CustomModal';
import InputComponent from '@/components/Input';

// import { Container } from './styles';

const Carrinho: React.FC = () => {
  const [cep, setCep] = useState(``);
  const [email, setEmail] = useState(``);
  const [loadingCep, setLoadingCep] = useState(false);
  const [open, setOpen] = useState(false);

  const [freteList, setFreteList] = useState<FreteData[]>([]);

  const {
    cart,
    removeItemFromCart,
    setCartToStorage,
    totalCartValue,
    increaseItemCartQuantity,
    decreaseItemCartQuantity,
    frete,
    setFrete,
  } = useCart();
  const { recentItems } = useProduct();

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

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <Layout>
      <Container>
        <CustomModal open={open} setOpen={setOpen}>
          <>
            <h2>Para continuar, informe seu email!</h2>
            <InputComponent
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Seu email"
            />
            <Link
              onClick={(e) => {
                if (email === ``) e.preventDefault();
              }}
              className="site-button-fill"
              href={`/checkout?email=${email}&cep=${cep}`}
            >
              Continuar
            </Link>
          </>
        </CustomModal>
        <div className="wrapper">
          <section>
            <div className="cart">
              <div className="header">
                <h1>Carrinho de compras</h1>
                <p className="price-text">Preço</p>
              </div>
              {cart?.map((item) => {
                return (
                  <div key={item.id} className="item">
                    <div className="separator">
                      <div className="img-product">
                        <img src={item.banner} alt="product" />
                      </div>
                      <div className="info">
                        <p className="name-product bold">{item.name}</p>
                        <div className="options">
                          <label htmlFor="">Quantidade: </label>
                          <div className="separator quantity">
                            <button
                              onClick={() => decreaseItemCartQuantity(item)}
                              className=" site-button"
                            >
                              <HiChevronLeft className="icon" />
                            </button>
                            <input
                              type="numeric"
                              readOnly
                              value={item.quantity}
                              placeholder="1"
                            />
                            <button
                              onClick={() => increaseItemCartQuantity(item)}
                              className=" site-button"
                            >
                              <HiChevronRight className="icon" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItemFromCart(item)}
                            className="exclude site-button-fill"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="price">{formatter(item.price)}</p>
                  </div>
                );
              })}
            </div>
            <div className="cep">
              <div className="header">
                <p>Calcular frete</p>
              </div>
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
                      <input
                        type="radio"
                        value={item.Valor}
                        onChange={(e) =>
                          setFrete({
                            value: Number(item.Valor.replace(`,`, `.`)),
                            prazo: item.PrazoEntrega,
                          })
                        }
                      />
                      <div className="separator">
                        <span>{item.Valor}</span>
                        <strong>{item.PrazoEntrega} dias uteis</strong>
                        <span>Correios SEDEX</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <aside>
            <div className="resume">
              <div className="header">
                <p>RESUMO</p>
              </div>
              <div className="info">
                <div className="row">
                  <span className="key">Valor dos produtos:</span>
                  <span className="value">{formatter(totalCartValue)}</span>
                </div>
                <div className="row">
                  <span className="key">Frete:</span>
                  <span className="value">{formatter(frete.value)}</span>
                </div>
                <div className="row">
                  <span className="key">Total:</span>
                  <span className="value">
                    {formatter(totalCartValue + frete.value)}
                  </span>
                </div>
              </div>
              <button onClick={onOpenModal} className="site-button fluid-width">
                Fechar pedido
              </button>
            </div>
            <div className="recent-products">
              <div className="header">
                <p>Seus itens recentes</p>
              </div>

              {recentItems.map((item) => (
                <div key={item.id} className="item">
                  <div className="img-product">
                    <img src={item.banner} alt="product" />
                  </div>
                  <div className="info">
                    <p className="name">{item.name}</p>
                    <p className="price">{formatter(item.price)}</p>
                    <button
                      onClick={() => setCartToStorage(item)}
                      className="site-button fluid-width"
                    >
                      <span>Adicionar</span>
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </Layout>
  );
};

export default Carrinho;
