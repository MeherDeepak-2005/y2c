import { useEffect, useState } from 'react';
import {
  Center,
  Box,
  Avatar,
  Button,
  useColorModeValue,
  Badge,
  Stack,
  Heading,
  Text,
  IconButton,
  Link
} from '@chakra-ui/react';
import ParseCookies from '../services/parseCookies';
import jwt from 'jsonwebtoken';
import { db } from '../services/firebase';
import { PhoneIcon } from '@chakra-ui/icons';
import {
  doc,
  onSnapshot,
  collection,
  where,
  query
} from '@firebase/firestore';
import router from 'next/router'
import NavBar from '../components/navbar';


function Profile({ userInfo }) {

  const [message, setMessage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();


  useEffect(() => {
    onSnapshot(query(collection(db, 'members'), where('email', '==', userInfo.email)), snapshot => {
      const data = snapshot.docs[0];
      setMessage(data.data().message);
      setName(userInfo.name = data.data().name)
      setPhone(userInfo.phone = data.data().phone)
      setRole(userInfo.role = data.data().role)
      setEmail(userInfo.email)
      setImageUrl(data.data().image)
      userInfo.id = data.data().id
    })
  }, [])
  
  const telHref = `tel:${userInfo.phone}`

  return (
    <>
      <NavBar />
      <Center py={6}>
          <Box
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Avatar
              size={'xl'}
              src={imageUrl}
              alt={'Avatar Alt'}
              mb={4}
              pos={'relative'}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {name}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              {email}
            </Text>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
          
            </Text>

            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}>
                {
                  role
                }
              </Badge>
            </Stack>
            <Stack mt={8} direction={'row'} spacing={4}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}>
                <Link href={telHref}>
                  <IconButton size='xs' as={PhoneIcon} />
                </Link>
              </Button>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                onClick={() => {
                  router.push('/edit/profile')
                }
                }
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Edit
              </Button>
            </Stack>
          </Box>
      </Center>
    </>
  )
}

export default Profile;

Profile.getInitialProps = ({ req }) => {
  const cookies = ParseCookies(req)
  const token = cookies.token
  const userInfo = jwt.decode(token)
  return {
    userInfo: userInfo
  };
}