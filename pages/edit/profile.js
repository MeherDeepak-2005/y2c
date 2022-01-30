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
  IconButton,
  HStack,
  Select
} from '@chakra-ui/react';
import { useState } from 'react';
import { onSnapshot, updateDoc, query, collection, doc, where } from '@firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import NavBar from '../../components/navbar';
import router from 'next/router';
import { db,storage } from '../../services/firebase';
import ParseCookies from '../../services/parseCookies';
import { DeleteIcon } from '@chakra-ui/icons';
import jwt from 'jsonwebtoken'
import { useEffect } from 'react';
import Cookies from 'js-cookie';


export default function EditProfile({ userInfo }) {
  
  const email = userInfo.email;
  const [message, setMessage] = useState();
  const [image, setImage] = useState(null);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [load, setLoad] = useState();
  const [userDoc,setUserDocId] = useState()
  const [role, setRole] = useState();

  useEffect(async () => { 
    onSnapshot(query(collection(db, 'members'), where('email', '==', email)), snapshot => {
      const data = snapshot.docs[0];
      setMessage(data.data().message);
      setName(data.data().name);
      setPhone(data.data().phone);
      setRole(data.data().role);
      setUserDocId(data.data().id)
    })
  },[db,doc])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    const docRef = doc(db, 'members', userDoc);

    if (message.length > 100) {
    
      if (image) {
        const imageRef = ref(storage, `profile_pictures/${name}/${image.name}`)
    
        await uploadBytesResumable(imageRef, image).then(
          async snapshot => {
            const downloadUrl = await getDownloadURL(imageRef);
            localStorage.setItem('image', downloadUrl);
            await updateDoc(docRef, {
              image: downloadUrl,
              name: name,
              phone: phone,
              role: role,
              message: message,
            })

          });
        setLoad(false)
        router.push('/profile')
      } else {
        const update = await updateDoc(docRef, {
          name: name,
          phone: phone,
          role: role,
          message: message,
        });
        setLoad(false)
        router.push('/profile')
      }
    }
    else {
      alert('Message should be atleast of 100 characters')
      setLoad(false)
    }
  }

  return (
    <>
      <NavBar/>
    <form>
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
              Edit your profile
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
            <Input
              onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                placeholder="Name"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                value={phone}
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
              <FormLabel htmlFor='country'>Role</FormLabel>
            <Select value={role} onChange={(e) => { setRole(e.target.value)}} id='country' placeholder='Select Role'>
                <option>Founder</option>
                <option>Co-Founder</option>
                 <option>Guwahati Team</option>
                <option>Hyderabad Team</option>
              </Select>
            <Textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} bg='gray.100' _placeholder={{
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
                  <IconButton _focus={{outline:'none'}} cursor='pointer' onClick={()=>{setImage(null)}} size='10px' as={DeleteIcon}/>
                </HStack>
                
              )
            }
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
        </Stack>
    </Box>
      </form>
    </>
  );
}

EditProfile.getInitialProps = ({ req }) => {
  const cookies = ParseCookies(req)
  const token = cookies.token
  const userInfo = jwt.decode(token)
  return {
    userInfo: userInfo
  };
}