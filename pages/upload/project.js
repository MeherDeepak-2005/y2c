import {
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Center,
  VStack,
  FormLabel,
  Select,
  Textarea,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import router from 'next/router';
import Cookie from 'js-cookie';
import ParseCookies from '../../services/parseCookies';
import { addDoc, updateDoc, collection, doc, where } from '@firebase/firestore';
import { DeleteIcon } from '@chakra-ui/icons';
import {db,storage} from '../../services/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import NavBar from '../../components/navbar';


export default function Project({ authentication }) {

  
  const [message, setMessage] = useState();
  const [image, setImage] = useState();
  const [load, setLoad] = useState(false)
  const [title,setTitle] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)

    if (message.length > 300 && title.length > 0) {
      const docRef = await addDoc(collection(db, 'project_updates'), {
        message: message,
        title: title,
        image: ''
      })
        if (image) {
          const imageRef = ref(storage, `project_updates/${image.name}`)
      
          await uploadBytesResumable(imageRef, image).then(
            async snapshot => {
              const downloadUrl = await getDownloadURL(imageRef);
              await updateDoc(docRef, {
                id: docRef.id,
                image: downloadUrl,
              })
            });
        }
      setLoad(false)
      router.push('/')
      }
      else {
        alert('Message should be atleast of 100 characters')
        setLoad(false)
      }
    }

  if (authentication) {
    return (
      <>
        <NavBar />
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
                Add a project Update
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
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Project Title"
                  value={title}
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
            <Textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} bg='gray.100' _placeholder={{
              color: 'gray.500'
            }} border='none' minLength={'100'} required placeholder='Tell readers about the update.. Minimum of 300 characters'/>
            <FormLabel htmlFor='ImageUpload'>
              <Box m='auto' cursor='pointer' bg='gray.200' width='fit-content' p={2} borderRadius={'lg'}>
                {
                  image ? (
                    <Text>
                      Saved
                    </Text>
                  ): (
                          <Text>
                            Update Picture
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
        </form>
        </>
    )
  } else {
  
    return (
      <Center h='100vh'>
        <VStack>
          <Heading>
          You're not logged in.
          </Heading>
          <Button onClick={()=> {router.push('/logout')}}>
            Log in
          </Button>
        </VStack>
      </Center>
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