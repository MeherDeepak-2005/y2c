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

export default function Login() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState();
  const [load, setLoad] = useState();

  const handleId = (e) => {
    if (e.target.value.charAt(e.target.value.length-1) === ' ') {
      return null;
    }
    else {
      setId(e.target.value)
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    const res = await fetch('/api/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        id : id,
          password: password
        })
    }).then((t) => t.json())
    console.log(res)
    if (res.success) {
      setLoad(false)
      alert(res.success)
      router.push('/login')
    }
    else {
      setLoad(false)
      alert(res.message)
    }
  }

  

  
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
                    Reset password
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
                  onChange={(e) => handleId(e)}
                  required
                  placeholder="Your ID"
                  value={id}
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                  <Input
                    value={password}
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
