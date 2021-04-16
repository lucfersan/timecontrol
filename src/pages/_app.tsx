import { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { ModalProvider } from '../contexts/ModalContext';

import main from '../styles/themes/main';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={main}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>

      <GlobalStyles />
    </ThemeProvider>
  );
};

export default MyApp;
