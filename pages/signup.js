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
import { useEffect, useState } from 'react';
import router from 'next/router';
import Cookie from 'js-cookie';
import ParseCookies from '../services/parseCookies';
import NavBar from '../components/navbar';
import Cookies from 'js-cookie';

export default function JoinOurTeam({ authentication }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [uniqueKey, setUniqueKey] = useState();
  const [load, setLoad] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();

  const handleEmail = (e) => {
    if (e.target.value('') === ' ') {
      return null;
    } else {
      setEmail(e.target.value)
    }
  }
  
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    setLoad(true)

    if (confirmPassword === password) {
      const res = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          uniqueKey: uniqueKey,
          password: password
        })
      }).then((t) => t.json())
      
      const token = res.jwt_token

      if (token) {
        Cookie.set('token', token)
        router.push('/profile')
      }
      else {
        setLoad(false)
        alert(res.message)
      }
    } else {
      setLoad(false)
      alert('Passwords do not match. Make sure you typed in the same password and confirmed it.')
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
        <NavBar />
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
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                Join our team
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text">
                  !
                </Text>
              </Heading>
              <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                We’re looking for amazing people who are willing contribute towards the enhancement of the society just like you! Become a partof our rockstar team and help us to make the world a better place.
              </Text>
            </Stack>
            <Box as={'form'} mt={10}>
              <Stack spacing={4}>
                <Input
                  onChange={(e) => handleEmail(e)}
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
                  onChange={(e) => setUniqueKey(e.target.value)}
                  required
                  type='password'
                  placeholder="Unique Key"
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
                <Input
                  onChange={(e) => { setConfirmPassword(e.target.value) }}
                  required
                  minLength={'4'}
                  maxLength={'20'}
                  type="password"
                  placeholder="Confirm Password"
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
                  Already have an account?
                </Text>
            <Button _focus={{outline:'none'}} onClick={() => { router.push('/login') }}>
              Log In
              </Button>
          </Stack>
        </Box>
        </Center>
        </>
    );
  }
}

JoinOurTeam.getInitialProps = ({ req }) => {
  const cookies = ParseCookies(req)
  let token = false
  if (cookies.token) {
    token = true
  }
  return {
    authentication: token
  };
}