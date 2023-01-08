/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { useTheme } from 'styled-components';
import { useProduct } from '@/hooks/useProduct';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Link from 'next/link';

import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Layout from '@/components/Layout';

import { FaTruck, FaCreditCard, FaGamepad } from 'react-icons/fa';
import { TbCertificate } from 'react-icons/tb';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { Container } from '@/styles/pages/Home';
import { menuItens, newGames, oldGames } from '@/utils/dummyData';

import formatter from '@/utils/CurrencyFormatter';
import { child, get, getDatabase, ref } from 'firebase/database';

import { gamesType } from '@/contexts/ProductContext';

export default function Home({
  dataArray,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [popularSectionID, setPopularSectionID] = useState(
    `a7f4285b-00ae-4896-8bad-2a51854e2c8d`,
  );

  const { colors } = useTheme();
  const { categories } = useProduct();

  const handleChangePopularSection = (section: string) => {
    setPopularSectionID(section);
  };

  console.log(categories);

  return (
    <Layout>
      <Container>
        <div className="carossel">
          <Swiper
            loop={true}
            pagination={true}
            autoplay
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="img-container">
                <img
                  src="https://sinalizacao.procser.com.br/imagens/venda-de-promocao-banner.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="conteiner">
          <ul>
            <li>
              <FaCreditCard />
              <div className="separator">
                <p className="bold">12x sem juros</p>
                <p>5% off no pix</p>
              </div>
            </li>
            <li>
              <TbCertificate />
              <div className="separator">
                <p>Garantia</p>
                <p className="bold">de 1 ano</p>
              </div>
            </li>
            <li>
              <FaTruck />
              <div className="separator">
                <p>Envio</p>
                <p className="bold">Para todo o Brasil</p>
              </div>
            </li>
            <li>
              <FaGamepad />
              <div className="separator">
                <p className="bold">Jogos novos</p>
                <p>100% atualizado</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="popular">
          <h2>Produtos Populares</h2>
          <ul>
            {menuItens.map((item) => (
              <li
                style={{
                  borderBottom:
                    popularSectionID === item.category_id
                      ? `2px solid ${colors.primary}`
                      : `2px solid #fff`,
                }}
                key={item.label}
              >
                <button
                  style={{
                    color:
                      popularSectionID === item.category_id
                        ? colors.primary
                        : colors.text_alternative,
                  }}
                  onClick={() => handleChangePopularSection(item.category_id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="products">
            {dataArray
              .filter((i) => i.category_id === popularSectionID)
              .slice(0, 3)
              .map((item, index) => (
                <Link
                  href={`/produto/${item.id}`}
                  key={String(index)}
                  className="product"
                >
                  <div className="img">
                    <img src={item.banner} alt="" />
                  </div>
                  <div className="product-name">{item.name}</div>
                  <div className="product-price">{formatter(item.price)}</div>
                </Link>
              ))}
          </div>
        </div>
        <div className="discover">
          <div className="separator">
            <h2>Está de olho em algum jogo especial?</h2>
            <p className="subtitle">
              Temos a mais diversa coleções de jogos pra todos os gostos e
              plataformas, fique a vontade pra escolher algum jogo de nossa
              coleção
            </p>
            <Link href={`/busca`}>Ir para coleção</Link>
          </div>
          <img
            src="https://play-lh.googleusercontent.com/p7rx-TDw8mSXmnN5oreMbOrC6FTumoRsnz8rDxUHL6-7xYtLlzcyj1GS8UKyBx5eJg"
            alt=""
          />
        </div>
        <div className="item-carossel">
          <h2>Jogos antigos</h2>
          <Swiper
            autoplay
            slidesPerView={2}
            effect={`coverflow`}
            loop={true}
            centeredSlides={true}
            modules={[Autoplay, EffectCoverflow]}
            className="mySwiper"
          >
            {oldGames.map((item) => (
              <SwiperSlide key={item.name}>
                <Link href={`2`} className="item-container">
                  <img src={item.img} alt="" />
                  <div className="product-name">{item.name}</div>
                  <div className="product-price">{formatter(item.price)}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="button">
            <Link href={`/busca`}>Ver Tudo</Link>
          </div>
        </div>
        <div className="item-carossel">
          <h2>Jogos novos</h2>
          <Swiper
            autoplay
            slidesPerView={2}
            effect={`coverflow`}
            loop={true}
            centeredSlides={true}
            modules={[Autoplay, EffectCoverflow]}
            className="mySwiper"
          >
            {newGames.map((item) => (
              <SwiperSlide key={item.name}>
                <Link href={`2`} className="item-container">
                  <img src={item.img} alt="" />
                  <div className="product-name">{item.name}</div>
                  <div className="product-price">{formatter(item.price)}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="button">
            <Link href={`/busca`}>Ver Tudo</Link>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataArray: gamesType[];
}> = async ({ res }) => {
  res.setHeader(
    `Cache-Control`,
    `public, s-maxage=10, stale-while-revalidate=59`,
  );

  let dataArray: gamesType[] = [];

  const dbRef = ref(getDatabase());

  const response = await get(child(dbRef, `products/`));
  if (response.exists()) {
    dataArray = Object.values(response.val());
  }

  return {
    props: {
      dataArray,
    },
  };
};
