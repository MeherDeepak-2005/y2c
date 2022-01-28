import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  FormLabel,
  Input,
  Button,
  Textarea,
  useBreakpointValue,
  Icon,
  IconButton,
  HStack,
  Select
} from '@chakra-ui/react';
import { useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { addDoc, collection, doc, updateDoc, serverTimestamp } from '@firebase/firestore';
import router from 'next/router';
import { db, storage } from '../services/firebase';
import Cookie from 'js-cookie';
import { DeleteIcon } from '@chakra-ui/icons';


export default function JoinOurTeam() {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [uniqueKey, setUniqueKey] = useState();
  const [load, setLoad] = useState();
  const [confirmPassword,setConfirmPassword] = useState();

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
        alert('Something Went Wrong.. Try again later.')
      }

    } else {
      alert('You are not allowed to SignUp')
    }
  }

  return (
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
          form
        </Stack>
    </Box>
  );
}
