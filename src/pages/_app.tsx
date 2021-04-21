import { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import main from '../styles/themes/main';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={main}>
      <Component {...pageProps} />

      <GlobalStyles />
    </ThemeProvider>
  );
};

export default MyApp;
