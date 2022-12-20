import React, { useState } from 'react';
import { Props } from 'react-input-mask';
import { Input, Container, Label } from './styles';

interface InputType extends Props {
  label?: string;
  errorMsg?: string;
  errorCondition?: boolean;
  blurPlus?: () => void;
}

const InputMaskComponent = ({
  label,
  errorMsg = ``,
  errorCondition = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  blurPlus = () => {},
  ...props
}: InputType) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Container hasError={hasError}>
      {label && <Label hasError={hasError}>{label}</Label>}

      <Input
        hasError={hasError}
        onBlur={() => {
          blurPlus();
          setHasError(errorCondition);
        }}
        {...props}
      />

      <div className="error">
        <div className="box"></div>
        <span>{errorMsg}</span>
      </div>
    </Container>
  );
};

export default InputMaskComponent;
