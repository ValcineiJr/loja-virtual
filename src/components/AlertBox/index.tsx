import React from 'react';

import cn from 'classnames';

import { Container } from './styles';

type AlertBoxProps = {
  type: 'success' | 'danger';
  message: string;
  showAlert: boolean;
};

const AlertBox = ({ type, message, showAlert }: AlertBoxProps) => {
  return (
    <Container
      className={cn({ fadeIn: showAlert, fadeOut: !showAlert })}
      showAlert={showAlert}
      type={type}
      message={message}
    >
      <p>{message}</p>
    </Container>
  );
};

export default AlertBox;
