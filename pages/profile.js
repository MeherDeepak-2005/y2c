import { useState } from 'react';
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
  onSnapshot,
  collection,
  where,
  query,
  getDocs
} from '@firebase/firestore';
import router from 'next/router'
import NavBar from '../components/navbar';


function Profile({ userInfo }) {

  const user = JSON.parse(userInfo)[0];

  console.log(user)
  
  const telHref = `tel:${user.phone}`

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
              src={user.image}
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
              {user?.name}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              {user.email}
            </Text>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
            {
              user?.message?.slice(0,20)
          }...
            </Text>

            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}>
                {
                  user?.role
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
          <Stack m={10}>
            <Button onClick={()=> {router.push('/upload/project')}}>
              Upload a project
            </Button>
            <Button onClick={()=> {router.push('/upload/vision')}}>
              Update Vision
            </Button>
          </Stack>
         </Box>
      </Center>
    </>
  )
}

export default Profile;


export async function getServerSideProps({req}) {
  const cookies = ParseCookies(req)
  const token = cookies.token
  const userInfo = jwt.decode(token)
  console.log(userInfo)
  const user = await getDocs(query(collection(db, 'members'), where('email', '==', userInfo.email)))

  return {
    props: {
      userInfo: JSON.stringify(user.docs.map(item => item.data()))
    }
  };
}