import { Box } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  where
} from '@firebase/firestore';
import { db } from '../../../services/firebase';
import { Stack,Text,Heading,Input,FormLabel,Textarea,Button } from '@chakra-ui/react';
import NavBar from "../../../components/navbar";
import { query as FireQuery,doc,updateDoc } from '@firebase/firestore';
import { useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import router from 'next/router';

export default function EditProfile({ document }) {

  const token = Cookies.get('token');
  const decodedToken = jwt.decode(token);


  const documentInfo = JSON.parse(document)
  
  const [author, setAuthor] = useState(documentInfo.author);
  const [message, setMessage] = useState(documentInfo.message);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(documentInfo.title);
  const [load, setLoad] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    const docRef = doc(db, 'project_updates', documentInfo.id);


    if (message.length > 300) {
      
      if (!author.includes(decodedToken.email)) {
        author.push(decodedToken.email);
      }
    
      if (image) {
        const imageRef = ref(storage, `project_updates/${image.name}`)
    
        await uploadBytesResumable(imageRef, image).then(
          async snapshot => {
            const downloadUrl = await getDownloadURL(imageRef);
            localStorage.setItem('image', downloadUrl);
            await updateDoc(docRef, {
              image: downloadUrl,
            })
          });
      }
      const update = await updateDoc(docRef, {
        title: title,
        author: author,
        message: message,
      });
      router.push('/profile')
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
              Edit project
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
                  value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
                placeholder="Title"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            <Textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} bg='gray.100' _placeholder={{
              color: 'gray.500'
            }} border='none' minLength={'100'} required />
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
    </form>
    </>
  );
}

export async function getServerSideProps({ query }) {
  let document = {}
  const user = await getDocs(FireQuery(collection(db, 'project_updates'),where('id', '==', query.projectid)));
  user.docs.map(item => {
    const data = item.data()
    document = data;
  });

  return {
    props: {
      document: JSON.stringify(document)
    }
  };
}
