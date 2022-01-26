import { ChakraProvider,CSSReset } from '@chakra-ui/react'
import theme from '../helpers/theme';
import Fonts from '../helpers/fonts';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Fonts/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp