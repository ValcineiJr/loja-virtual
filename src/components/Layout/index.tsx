/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useState, useEffect } from 'react';

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

type LayoutProps = {
  children: ReactNode;
};

type SubMenusProps = {
  label: string;
  href: string;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

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
        <div className="row">
          <button onClick={toggleMenu} className="menu">
            <FaBars />
          </button>

          <Link href={`/`}>
            <div className="brand">
              <p>Salão de</p>
              <p style={{ fontSize: `4.4rem`, fontWeight: `bold` }}>Jogos</p>
            </div>
          </Link>

          <div onClick={closeMenu} className="overlay"></div>
          <nav>
            <ul>
              <li className="login-button">
                <Link href={`create`}>
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
          <Link href={`/carrinho`} className="menu">
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
        <div className="row">
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
      </header>
      <div className="wrapper container">{children}</div>

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
