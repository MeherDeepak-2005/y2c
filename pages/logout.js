import { useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  Center,
  Button,
  Heading,
  VStack
} from '@chakra-ui/react';
import router from 'next/router';

function Logout() {

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      Cookies.remove('token')
    }
  }, [])

  return <Center h='100vh'>
        <VStack>
          <Heading>
          You're already logged out.
          </Heading>
          <Button _focus={{outline:'none'}} onClick={()=> {router.push('/login')}}>
            Log In
          </Button>
        </VStack>
      </Center>;
}

export default Logout;
