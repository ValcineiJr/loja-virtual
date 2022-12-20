import React from 'react';

import { ThemeProvider } from 'styled-components';

import theme from '@/styles/theme';
import { ProductContextProvider } from '@/contexts/ProductContext';
import { CartContextProvider } from '@/contexts/CartContext';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CartContextProvider>
        <ProductContextProvider>{children}</ProductContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  );
};

export default Providers;
