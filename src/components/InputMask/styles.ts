import styled from 'styled-components';
import InputMask from 'react-input-mask';

type Props = {
  hasError: boolean;
};

export const Input = styled(InputMask)<Props>`
  height: 40px;
  padding: 16px;

  width: 100%;

  font-family: 'Poppins';

  font-size: 1.6rem;

  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.colors.primary : `#cecece`)};
  border-radius: 5px;

  margin-top: 5px;

  &:disabled {
    background: #eee !important;
    color: #555 !important;
  }
`;

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;

  .error {
    background: white;
    height: 30px;

    display: flex;

    align-items: center;

    position: relative;

    overflow: hidden;

    .box {
      position: absolute;

      transition: all 1s;

      background-color: white;

      width: 100%;
      height: 100%;

      top: ${({ hasError }) => (hasError ? `30` : 0)}px;
    }

    span {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Label = styled.label<Props>`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme, hasError }) =>
    hasError ? theme.colors.primary : theme.colors.text_alternative};
`;
