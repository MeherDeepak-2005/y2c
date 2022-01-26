import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';


const config = {
  intialColorMode: 'light',
  useSystemColorMode: false
}

const styles = {
  global: props => {
    body: {
      bg: mode('#f027db','#202023')(props)
    }
  }
}

const components = {
  Heading: {
    variant: {
      'page-title': {
        fontFamily: "'M PLUS Rounded 1c'"
      }
    }
  }
}
const fonts = {
  heading: "'M PLUS Rounded 1c'"
}

const theme = extendTheme({ config,styles,components,fonts })

export default theme