/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';

import InputComponent from '@/components/Input';
import Layout from '@/components/Layout';

import { Container } from '@/styles/pages/Login';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CustomModal from '@/components/CustomModal';

const Login: React.FC = () => {
  const router = useRouter();

  const { route } = router.query;

  const [email, setEmail] = useState(``);
  const [open, setOpen] = useState(false);

  function handleLogin(e: any) {
    e.preventDefault();

    if (route) {
      router.push(`/${route}`);
    } else {
      router.push(`/`);
    }
  }

  function handleSignIn() {
    router.push(`/login/create?email=${email}`);
  }

  return (
    <Layout>
      <CustomModal open={open} setOpen={setOpen}>
        <>
          <h2 style={{ fontSize: `2.6rem` }}>
            Para continuar, informe seu email!
          </h2>
          <p style={{ margin: `10px 0` }}>
            Para recuperar sua senha é simples! Informe seu e-mail no campo
            abaixo e receba ela por email.
          </p>

          <InputComponent label="Informe seu e-mail" />
          <div className="row">
            <button
              className="site-button fluid-width"
              onClick={() => setOpen(false)}
            >
              Fechar
            </button>
            <button
              onClick={() => setOpen(false)}
              className="site-button-fill fluid-width"
            >
              Enviar dados
            </button>
          </div>
        </>
      </CustomModal>
      <Container>
        <h2>Já sou cadastrado</h2>
        <form onSubmit={handleLogin}>
          <InputComponent
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail"
          />
          <InputComponent label="Senha" type="password" />
          <p className="subtitle" onClick={() => setOpen(true)}>
            Esqueceu a senha?
          </p>
          <button type="submit" className="site-button-fill fluid-width">
            Entar
          </button>
        </form>
      </Container>

      <Container>
        <h2>Ainda não possuo cadastro</h2>
        <h3>Primeiro acesso?</h3>
        <h3>Faça seu cadastro aqui!</h3>
        <form onSubmit={handleSignIn}>
          <InputComponent
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail"
            errorMsg="Preencha com seu melhor email"
            errorCondition={email === ``}
          />
          <Link
            onClick={(e) => (email === `` ? e.preventDefault() : () => {})}
            href={`/login/create?email=${email}`}
            type="submit"
            className="site-button-fill fluid-width"
          >
            Cadastrar
          </Link>
        </form>
      </Container>
    </Layout>
  );
};

export default Login;
