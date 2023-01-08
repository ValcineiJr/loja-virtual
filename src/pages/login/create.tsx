import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import { Container } from '@/styles/pages/Create';
import InputComponent from '@/components/Input';
import InputMaskComponent from '@/components/InputMask';
import { useAlert } from '@/hooks/useAlert';

const Create: React.FC = () => {
  const { query } = useRouter();
  const [email, setEmail] = useState(query.email);
  const { triggerAlert } = useAlert();

  function buscarCep() {
    fetch(`https://viacep.com.br/ws/21765430/json/`, { mode: `cors` })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty(`erro`)) {
          // alert(`Cep não existente`);
          // setIsCepValid(false);
        } else {
          // setNeighborhood(data.bairro);
          // setCity(data.localidade);
          // setState(data.uf);
          // setAddress(data.logradouro);
          // setIsCepValid(true);
        }
      })
      .catch((err) => {
        console.log(err);
        // setIsCepValid(false);
      });
  }

  return (
    <Layout>
      <Container>
        <h1>Cadastre-se</h1>
        <form>
          <div className="box">
            <h2>Dados para acesso</h2>
            <InputComponent
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="E-mail"
            />
            <InputComponent type="password" label="Senha" />
            <InputComponent type="password" label="Confirmar Senha" />
          </div>
          <div className="box">
            <h2>Dados pessoais</h2>
            <InputComponent label="Nome" />
            <InputMaskComponent
              mask={`999.999.999-99`}
              maskPlaceholder=""
              type="text"
              label="CPF"
            />
            <InputMaskComponent
              mask={`99/99/9999`}
              maskPlaceholder=""
              type="text"
              label="Data de nascimento"
            />
            <InputMaskComponent
              mask={`(99)99999-9999`}
              maskPlaceholder=""
              type="text"
              label="Celular"
            />
          </div>
          <div className="box">
            <h2>Endereço</h2>
            <InputMaskComponent
              mask="99999-999"
              type="text"
              label="CEP"
              blurPlus={buscarCep}
              // errorCondition={!isCepValid}
              // errorMsg="Cep inválido"
            />
            <InputComponent type="text" label="Endereço" disabled />
            <InputComponent type="text" label="Número" />
            <InputComponent type="text" label="Complemento" />
            <InputComponent type="text" label="Referência" />
            <InputComponent type="text" label="Bairro" disabled />
            <InputComponent type="text" label="Cidade" disabled />
            <InputComponent type="text" label="Estado" disabled />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              triggerAlert(`success`, `AAAAAAAAAA, eu to maluco`, 3000);
            }}
            className="site-button-fill fluid-width"
            type="submit"
          >
            Criar conta
          </button>
        </form>
      </Container>
    </Layout>
  );
};

export default Create;
