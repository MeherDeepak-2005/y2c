import {
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Center,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import router from 'next/router';
import Cookie from 'js-cookie';
import ParseCookies from '../services/parseCookies';
import Cookies from 'js-cookie';
import NavBar from '../components/navbar';

export default function Login({ authentication }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [load, setLoad] = useState();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
    }).then((t) => t.json())
    if (res.jwt_token) {
      Cookie.set('token', res.jwt_token)
      localStorage.setItem('image',res.image)
      setLoad(false)
      router.push('/profile')
    }
    else {
      setLoad(false)
      alert('Invalid email or password')
    }
  }

  const logOut = () => {
    Cookies.remove('token')
    localStorage.removeItem('image')
    router.push('/login')
  }

  if (authentication) {
    return (
      <>
        <NavBar/>
      <Center h='100vh'>
        <VStack>
          <Heading>
          You're already logged in.
          </Heading>
          <Button _focus={{outline:'none'}} onClick={logOut}>
            Log out
          </Button>
        </VStack>
        </Center>
      </>
        
    )
  } else {
  
    return (
      <>
        <NavBar/>
      <Center m='auto' justifyContent='center' alignItems='center' height='100vh'>
        <Box maxW={{ base: '100%', md: '50%' }} m='auto' position={'relative'}>
          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
            <Stack spacing={4}>
              <Center>
                <Heading
                  color={'gray.800'}
                  lineHeight={1.1}
                  fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                  Log In
                  <Text
                    as={'span'}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text">
                    !
                  </Text>
                </Heading>
              </Center>
            </Stack>
            <Box as={'form'} mt={10}>
              <Stack spacing={4}>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                  value={email}
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Input
                  onChange={(e) => { setPassword(e.target.value) }}
                  required
                  minLength={'4'}
                  maxLength={'20'}
                  type="password"
                  placeholder="Password"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
              </Stack>
                <Button
              _focus={{outline:'none'}}    
                onClick={handleSubmit}
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                type='submit'
                isLoading={load}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}>
                Submit
              </Button>
              </Box>
                <Text textAlign={'center'}>
                  Don&#39;t have an account?
                </Text>
              <Button _focus={{outline:'none'}} onClick={()=>{router.push('/signup')}}>
                Signup
              </Button>
            </Stack>
          </Box>
      </Center>
      </>
    );
  }
}


Login.getInitialProps = ({ req }) => {
  const cookies = ParseCookies(req)
  let token = false
  if (cookies.token) {
    token = true
  }
  return {
    authentication: token
  };
}