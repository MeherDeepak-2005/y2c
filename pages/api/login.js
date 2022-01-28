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

import { DeleteIcon } from '@chakra-ui/icons';


export default function JoinOurTeam() {

  const [image, setImage] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [password, setPassword] = useState();
  const [uniqueKey, setUniqueKey] = useState();
  const [load, setLoad] = useState();
  const [role, setRole] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (uniqueKey === '30X28XEXE') {
      
    const docRef = await addDoc(collection(db, 'members'), {
      image: '',
      name: name,
      phone: phone,
      timestamp: serverTimestamp(),
      email: email,
      message: message,
      password: password,
      role:role
    })

    const imageRef = ref(storage, `profile_pictures/${name}/${image.name}`)
    
    await uploadBytesResumable(imageRef, image).then(
      async snapshot => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'members', docRef.id), {
          image: downloadUrl,
        })
      });

    setLoad(false);

    router.push('/about')
      
    }
    else {
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
              onChange={(e) => setName(e.target.value)}
              required
                placeholder="Firstname"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
                placeholder="firstname@lastname.io"
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
              onChange={(e) => { setPhone(e.target.value) }}
              required
                placeholder="+91 "
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
              <FormLabel htmlFor='country'>Role</FormLabel>
            <Select onChange={(e) => { setRole(e.target.value);console.log(e.target.value)}} id='country' placeholder='Select Role'>
                <option>Founder</option>
                <option>Co-Fonder</option>
                 <option>Assam Team</option>
                <option>Hyderabad Team</option>
              </Select>
            <Textarea onChange={(e)=>{setMessage(e.target.value)}} bg='gray.100' _placeholder={{
              color: 'gray.500'
            }} border='none' minLength={'100'} required placeholder='Tell us about yourself'/>
            <FormLabel htmlFor='ImageUpload'>
              <Box m='auto' cursor='pointer' bg='gray.200' width='fit-content' p={2} borderRadius={'lg'}>
                {
                  image ? (
                    <Text>
                      Saved
                    </Text>
                  ): (
                    <Text>
                      Upload Profile Picture
                    </Text>
                  )
                }
              </Box>
            </FormLabel>
            <Input accept='image/png, image/jpg, image/jpeg, image/webp, image/HEIC' onChange={(e) => { setImage(e.target.files[0]) }} hidden id='ImageUpload' type='file' />
            {
              image && (
                <HStack>
                  <Text>
                    {
                      image.name
                    }
                  </Text>
                  <IconButton cursor='pointer' onClick={()=>{setImage(null)}} size='10px' as={DeleteIcon}/>
                </HStack>
                
              )
            }
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
        </Stack>
    </Box>
  );
}
