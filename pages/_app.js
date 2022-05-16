import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from '../helpers/theme';
import Fonts from '../helpers/fonts';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import createEmotioncache from '../helpers/mui/createEmotionCache';
import MuiTheme from '../helpers/mui/theme';

const clientSideEmotionCache = createEmotioncache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={MuiTheme}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <CssBaseline />
          <Fonts />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp