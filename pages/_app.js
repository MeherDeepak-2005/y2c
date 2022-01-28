import { ChakraProvider,CSSReset } from '@chakra-ui/react'
import theme from '../helpers/theme';
import Fonts from '../helpers/fonts';
import {
  RecoilRoot,
} from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Fonts />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default MyApp