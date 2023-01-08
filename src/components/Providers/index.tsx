import React from 'react';

import { ThemeProvider } from 'styled-components';

import theme from '@/styles/theme';
import { ProductContextProvider } from '@/contexts/ProductContext';
import { CartContextProvider } from '@/contexts/CartContext';
import { AlertContextProvider } from '@/contexts/AlertContext';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AlertContextProvider>
        <CartContextProvider>
          <ProductContextProvider>{children}</ProductContextProvider>
        </CartContextProvider>
      </AlertContextProvider>
    </ThemeProvider>
  );
};

export default Providers;
