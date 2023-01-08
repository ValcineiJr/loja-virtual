/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useState, useEffect } from 'react';

import cn from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  FaBars,
  FaShoppingCart,
  FaSearch,
  FaUserAlt,
  FaChevronRight,
  FaArrowLeft,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';

import { Container } from './styles';

import { menuItens } from '@/utils/dummyData';
import AlertBox from '../AlertBox';
import { useAlert } from '@/hooks/useAlert';

type LayoutProps = {
  children: ReactNode;
};

type SubMenusProps = {
  label: string;
  href: string;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { showAlert, messageAlert, typeAlert } = useAlert();

  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState(``);
  const [toggleSubmenu, setToggleSubMenu] = useState(false);
  const [submenus, setSubMenus] = useState<SubMenusProps[]>([]);

  const toggleMenu = () => {
    setToggle((state) => !state);
    setToggleSubMenu(false);
  };

  const closeMenu = () => {
    setToggle(false);
    setToggleSubMenu(false);
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.overflow = `scroll`;
    }
  }, [toggle]);

  useEffect(() => {
    closeMenu();
  }, [router]);

  return (
    <Container toggle={toggle} toggleSubmenu={toggleSubmenu}>
      <header>
        <div className="row one">
          <button onClick={toggleMenu} className="menu menu-mobile">
            <FaBars />
          </button>

          <Link href={`/`} className="logo">
            <div className="brand">
              <p>Salão de</p>
              <p style={{ fontSize: `4.4rem`, fontWeight: `bold` }}>Jogos</p>
            </div>
          </Link>

          <div onClick={closeMenu} className="overlay"></div>
          <nav>
            <ul>
              <li className="login-button">
                <Link href={`/login`}>
                  <FaUserAlt />
                  <div className="separator">
                    <p>Faça seu login</p>
                    <p>ou cadastre-se</p>
                  </div>
                </Link>
              </li>

              {menuItens.map((item) => (
                <li key={item.label}>
                  <span
                    onClick={() => {
                      setSubMenus(item.submenus);
                      setToggleSubMenu(true);
                    }}
                    className="link"
                  >
                    {item.label}
                    <FaChevronRight />
                  </span>
                </li>
              ))}
            </ul>
          </nav>
          <Link href={`/carrinho`} className="menu mobile-cart">
            <FaShoppingCart />
          </Link>
          <div className="sub-menu">
            <button onClick={() => setToggleSubMenu(false)}>
              <FaArrowLeft />
              Voltar
            </button>

            <ul>
              {submenus.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row two">
          <div className="input">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Faça sua pesquisa aqui"
            />
            <Link
              onClick={(e) =>
                searchTerm === `` ? e.preventDefault() : setSearchTerm(``)
              }
              href={`/busca?q=${searchTerm}`}
              className="search-button"
            >
              <FaSearch />
            </Link>
          </div>
        </div>
        <div className="row three">
          <Link className="login-button login" href={`/login`}>
            <FaUserAlt className="color icon" />
            <div className="separator">
              <p>
                Faça seu <span className="color">login</span>
              </p>
              <p>
                ou <span className="color">cadastre-se</span>
              </p>
            </div>
          </Link>

          <Link href={`/carrinho`} className="menu cart">
            <FaShoppingCart />
          </Link>
        </div>
      </header>
      <nav className="desktop-menu">
        <ul>
          {menuItens.map((item) => (
            <li
              className="menu"
              key={item.label}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `#D90429`;
                e.currentTarget.children[1].setAttribute(`id`, `show`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `#2B2D42`;
                e.currentTarget.children[1].removeAttribute(`id`);
              }}
            >
              <span className="link">{item.label}</span>
              <div className="sub-menu">
                <ul>
                  {item.submenus.map((item, index) => (
                    <li
                      className={cn({ sub: index === 0 })}
                      key={item.label}
                      onMouseOver={(e) => {
                        if (e.currentTarget.children[1])
                          e.currentTarget.children[1].setAttribute(
                            `id`,
                            `show`,
                          );
                      }}
                      onMouseLeave={(e) => {
                        if (e.currentTarget.children[1])
                          e.currentTarget.children[1].removeAttribute(`id`);
                      }}
                    >
                      <Link href={item.href}>{item.label}</Link>
                      {/* <FaChevronRight /> */}
                      {index === 0 && (
                        <div className="sub-sub-menu">
                          <ul>
                            <li>Acessórios</li>
                            <li>Consoles</li>
                            <li>Jogos</li>
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="wrapper container">
        <AlertBox
          type={typeAlert}
          showAlert={showAlert}
          message={messageAlert}
        />
        {children}
      </div>

      <footer>
        <div className="wrapper">
          <p>&copy; 2022 Salão de Jogos por Valcinei Junior.</p>
          <div className="social">
            <ul>
              <li>
                <Link target="_blank" href={`https://github.com/ValcineiJr`}>
                  <FaGithub />
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href={`https://www.linkedin.com/in/valcinei-junior-94aa16176/`}
                >
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Layout;
