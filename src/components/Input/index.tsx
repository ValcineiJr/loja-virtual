import React, { InputHTMLAttributes, useState } from 'react';

import { Input, Container, Label } from './styles';

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMsg?: string;
  errorCondition?: boolean;
}

const InputComponent = ({
  label,
  errorMsg = ``,
  errorCondition = false,
  ...props
}: InputType) => {
  const [hasError, setHasError] = useState(false);
  return (
    <Container hasError={hasError}>
      {label && <Label hasError={hasError}>{label}</Label>}

      <Input
        hasError={hasError}
        onBlur={() => setHasError(errorCondition)}
        {...props}
      />

      <div className="error">
        <div className="box"></div>
        <span>{errorMsg}</span>
      </div>
    </Container>
  );
};

export default InputComponent;
