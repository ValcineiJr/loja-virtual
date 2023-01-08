import styled from 'styled-components';

type ContainerProps = {
  type: 'success' | 'danger';
  showAlert: boolean;
  message: string;
};

export const Container = styled.div<ContainerProps>`
  flex: 1;
  width: 100%;
  max-width: 300px;

  z-index: 99999;

  position: fixed;

  left: 0;
  right: 0;
  /* top: 0; */
  margin-left: auto;
  margin-right: auto;

  background-color: ${({ theme, type }) =>
    type === `danger` ? theme.colors.danger : theme.colors.success};

  padding: 16px;

  border-radius: 5px;

  display: ${({ message }) => (message === `` ? `none` : `flex`)};

  p {
    font-size: 1.6rem;
    color: white;
    text-align: center;
  }

  &.fadeIn {
    animation-name: grow;
    animation-duration: 0.6s;
    animation-fill-mode: forwards;
  }

  &.fadeOut {
    animation-name: shrink;
    animation-duration: 0.6s;
    animation-fill-mode: forwards;
  }

  @keyframes grow {
    0% {
      display: flex !important;
      transform: scale(0);
    }

    100% {
      display: flex !important;
      transform: scale(1);
    }
  }
  @keyframes shrink {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }
`;
