/* eslint-disable @next/next/no-img-element */

import Layout from '@/components/Layout';
import { Container } from '@/styles/pages/Checkout';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import InputComponent from '@/components/Input';
import InputMaskComponent from '@/components/InputMask';
import formatter from '@/utils/CurrencyFormatter';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

// import { Container } from './styles';

const Checkout: React.FC = () => {
  const router = useRouter();
  const { email, cep } = router.query;
  const { totalCartValue, frete, cart } = useCart();

  //User
  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState<string>(``);
  const [confirm_password, setConfirm_password] = useState<string>(``);
  const [telefone, setTelefone] = useState<string>(``);
  const [birth_date, setBirth_date] = useState<any>(``);
  const [cpf, setCpf] = React.useState<string>(``);
  const [name, setName] = React.useState<string>(``);

  //Address
  const [neighborhood, setNeighborhood] = useState(``);
  const [city, setCity] = useState(``);
  const [state, setState] = useState(``);
  const [address, setAddress] = useState(``);
  const [number, setNumber] = useState(``);
  const [userCep, setCep] = useState(cep);
  const [isCepValid, setIsCepValid] = useState(true);
  const [complement, setComplement] = useState(``);
  const [reference, setReference] = useState(``);

  //CC
  const [CCcvc, setCCCvc] = useState(``);
  const [CCexpiry, setCCExpiry] = useState(``);
  const [CCfocus, setCCFocus] = useState<any>(``);
  const [CCName, setCCName] = useState(``);
  const [CCNumber, setCCNumber] = useState(``);

  const handleInputFocus = (e: any) => {
    setCCFocus(e.target.name);
  };

  function buscarCep() {
    fetch(`https://viacep.com.br/ws/${userCep}/json/`, { mode: `cors` })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty(`erro`)) {
          // alert(`Cep não existente`);
          setIsCepValid(false);
        } else {
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setState(data.uf);
          setAddress(data.logradouro);
          setIsCepValid(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsCepValid(false);
      });
  }

  useEffect(() => {
    if (cep) {
      buscarCep();
    }
  }, [cep]);

  function formatDate() {
    const result = new Date();
    result.setDate(result.getDate() + Number(frete.prazo));
    return result.toLocaleDateString();
  }

  const user = true;

  return (
    <Layout>
      <Container>
        <div className="header">
          <div className="number">1</div>
          <p className="title">Revisar itens e envio</p>
        </div>
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="item">
              <div className="item-img">
                <img src={item.banner} alt="" />
              </div>
              <div className="info">
                <p className="name">{item.name}</p>
                <p className="price">{formatter(item.price)}</p>
                <input type="text" value={item.quantity} />
              </div>
            </div>
          ))}

          <p className="frete">Entrega estimada: {formatDate()}</p>
        </div>
      </Container>
      {user ? (
        <>
          <Container>
            <div className="header">
              <div className="number">2</div>
              <p className="title">Dados cadastrais</p>
            </div>
            <div className="content">
              <div className="row">
                <p className="key">Nome: </p>
                <p className="value">valcinei furtado cardozo junior</p>
              </div>
              <div className="row">
                <p className="key">E-mail: </p>
                <p className="value">valcineifurtadotrab@gmail.com</p>
              </div>
              <div className="row">
                <p className="key">Celular: </p>
                <p className="value">(21)98880-0405</p>
              </div>
              <div className="row">
                <p className="key">CPF: </p>
                <p className="value">175.576.017-50</p>
              </div>
            </div>
          </Container>
          <Container>
            <div className="header">
              <div className="number">3</div>
              <p className="title">Endereço</p>
            </div>
            <div className="content" style={{ padding: 10 }}>
              <div className="row" style={{ padding: 0 }}>
                <p className="value">Rua birigui</p>
              </div>
              <div className="row" style={{ padding: 0 }}>
                <p className="value">76</p>
              </div>
              <div className="row" style={{ padding: 0 }}>
                <p className="value">Realengo</p>
              </div>
              <div className="row" style={{ padding: 0 }}>
                <p className="value">Rio de Janeiro, RJ 21765-430</p>
              </div>
            </div>
          </Container>
          <Container>
            <div className="header">
              <div className="number">4</div>
              <p className="title">Pagamento</p>
            </div>
            <div className="card">
              <Cards
                locale={{ valid: `validade` }}
                placeholders={{ name: `Seu Nome Aqui` }}
                cvc={CCcvc}
                expiry={CCexpiry}
                focused={CCfocus}
                name={CCName}
                number={CCNumber}
              />
            </div>

            <form>
              <InputMaskComponent
                mask="9999 9999 9999 9999"
                maskPlaceholder=""
                type="tel"
                name="number"
                label="Número do Cartão"
                value={CCNumber}
                onChange={(e) => setCCNumber(e.target.value)}
                onFocus={handleInputFocus}
              />
              <InputComponent
                type="tel"
                name="name"
                label="Nome do Titular"
                placeholder="Como escrito no cartão"
                value={CCName}
                onChange={(e) => setCCName(e.target.value)}
                onFocus={handleInputFocus}
              />
              <InputMaskComponent
                mask="99/99"
                maskPlaceholder=""
                type="text"
                name="expiry"
                label="Validade"
                value={CCexpiry}
                onChange={(e) => setCCExpiry(e.target.value)}
                onFocus={handleInputFocus}
              />
              <InputComponent
                type="text"
                name="cvc"
                label="Cód. de Segurança"
                maxLength={3}
                value={CCcvc}
                onChange={(e) => setCCCvc(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={() => setCCFocus(`name`)}
              />
            </form>
          </Container>
          <Container>
            <div className="header">
              <div className="number">5</div>
              <p className="title">Finalizar Compra</p>
            </div>
            <div className="resumo">
              <p>Resumo do pedido</p>
              <div className="row">
                <span className="ligh">Itens:</span>
                <span className="ligh">
                  {formatter(totalCartValue + frete.value)}
                </span>
              </div>
              <div className="row">
                <span className="ligh">Frete:</span>
                <span className="ligh">{formatter(frete.value)}</span>
              </div>
            </div>

            <button
              style={{ marginTop: 20 }}
              className="site-button-fill fluid-width"
              type="submit"
            >
              Finalizar compra
            </button>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <div className="header">
              <div className="number">2</div>
              <p className="title">Novo cadastro</p>
              <Link href="/login" className="subtitle">
                Já tenho cadastro
              </Link>
            </div>

            <form>
              <InputComponent
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                label="E-mail"
                type="email"
              />
              <InputComponent
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Criar senha"
                errorMsg="Mínimo 5 caracteres"
                errorCondition={password.length < 5}
              />
              <InputComponent
                type="password"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                label="Confirmar senha"
                errorMsg="As senhas devem ser iguais"
                errorCondition={password !== confirm_password}
              />
              <InputComponent
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Nome completo"
                errorMsg="Digite o nome completo"
                errorCondition={!name.includes(` `)}
              />
              <InputMaskComponent
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                mask={`999.999.999-99`}
                maskPlaceholder=""
                type="text"
                label="CPF"
              />
              <InputMaskComponent
                value={birth_date}
                onChange={(e) => setBirth_date(e.target.value)}
                mask={`99/99/9999`}
                maskPlaceholder=""
                type="text"
                label="Data de nascimento"
              />
              <InputMaskComponent
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                mask={`(99)99999-9999`}
                maskPlaceholder=""
                type="text"
                label="Celular"
              />
            </form>
          </Container>

          <Container>
            <div className="header">
              <div className="number">3</div>
              <p className="title">Entrega</p>
            </div>

            <form>
              <InputMaskComponent
                mask="99999-999"
                value={userCep}
                onChange={(e) => setCep(e.target.value)}
                type="text"
                label="CEP"
                blurPlus={buscarCep}
                errorCondition={!isCepValid}
                errorMsg="Cep inválido"
              />
              <InputComponent
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                label="Endereço"
                disabled
              />
              <InputComponent
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="text"
                label="Número"
              />
              <InputComponent
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                label="Complemento"
              />
              <InputComponent
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                label="Referência"
              />
              <InputComponent
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                type="text"
                label="Bairro"
                disabled
              />
              <InputComponent
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                label="Cidade"
                disabled
              />
              <InputComponent
                value={state}
                onChange={(e) => setState(e.target.value)}
                type="text"
                label="Estado"
                disabled
              />
            </form>
          </Container>

          <Container>
            <div className="header">
              <div className="number">4</div>

              <p className="title">Pagamento</p>
            </div>
            <div className="card">
              <Cards
                locale={{ valid: `validade` }}
                placeholders={{ name: `Seu Nome Aqui` }}
                cvc={CCcvc}
                expiry={CCexpiry}
                focused={CCfocus}
                name={CCName}
                number={CCNumber}
              />
            </div>

            <form>
              <InputMaskComponent
                mask="9999 9999 9999 9999"
                maskPlaceholder=""
                type="tel"
                name="number"
                label="Número do Cartão"
                value={CCNumber}
                onChange={(e) => setCCNumber(e.target.value)}
                onFocus={handleInputFocus}
              />
              <InputComponent
                type="tel"
                name="name"
                label="Nome do Titular"
                placeholder="Como escrito no cartão"
                value={CCName}
                onChange={(e) => setCCName(e.target.value)}
                onFocus={handleInputFocus}
              />
              <InputMaskComponent
                mask="99/99"
                maskPlaceholder=""
                type="text"
                name="expiry"
                label="Validade"
                value={CCexpiry}
                onChange={(e) => setCCExpiry(e.target.value)}
                onFocus={handleInputFocus}
              />
              <InputComponent
                type="text"
                name="cvc"
                label="Cód. de Segurança"
                maxLength={3}
                value={CCcvc}
                onChange={(e) => setCCCvc(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={() => setCCFocus(`name`)}
              />
            </form>
          </Container>

          <Container>
            <div className="header">
              <div className="number">5</div>
              <p className="title">Finalizar Compra</p>
            </div>
            <div className="resumo">
              <p>Resumo do pedido</p>
              <div className="row">
                <span className="ligh">Itens:</span>
                <span className="ligh">
                  {formatter(totalCartValue + frete.value)}
                </span>
              </div>
              <div className="row">
                <span className="ligh">Frete:</span>
                <span className="ligh">{formatter(frete.value)}</span>
              </div>
            </div>

            <button
              style={{ marginTop: 20 }}
              className="site-button-fill fluid-width"
              type="submit"
            >
              Finalizar compra
            </button>
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Checkout;
