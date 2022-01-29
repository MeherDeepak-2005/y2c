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
import { useEffect } from 'react';
import { collection, onSnapshot, where,query } from 'firebase/firestore';
import { db } from '../services/firebase';
import NavBar from '../components/NavBar';
import Cookies from 'js-cookie';

export default function JoinOurTeam({ authentication }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [uniqueKey, setUniqueKey] = useState();
  const [load, setLoad] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
     onSnapshot(query(collection(db, 'members'), where('email', '==', email)), snapshot => {
       const data = snapshot.docs[0];
       try {
         if (data.data().email === email) {
           setEmail('')
         }
         alert('Email is already taken')
       } catch (err) {
         
       }
    })
  }, [email])
  
  const push = () => {
    router.push('/')
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
      Cookie.set('token', token)

      if (token) {
        router.push('/profile')
      }
      else {
        if (res.message) {
          alert(res.message)
        }
        else {
          alert('Email was already taken. Try again with another email.')
        }
        setLoad(false)
      }

    } else {
      alert('You are not allowed to SignUp')
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
          <Button onClick={logOut}>
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
            <Button onClick={() => { router.push('/login') }}>
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