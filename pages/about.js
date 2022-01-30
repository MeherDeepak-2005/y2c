import {
  Box,
  Heading,
  SimpleGrid,
  GridItem,
  Image, Text,
  Button, VStack,
  Avatar,
  Center,
  Flex,
  Stack,
  useColorModeValue,
  SkeletonCircle
} from '@chakra-ui/react';
import { useState } from 'react'
import { EditIcon } from '@chakra-ui/icons';
import { collection, getDocs, orderBy, query } from '@firebase/firestore';
import { db } from '../services/firebase';
import NavBar from '../components/navbar';
import Head from 'next/head';

export default function About({ fetchedMembers }) {
  const [Loading, isLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [imageUrl, setImageUrl] = useState();


  const members = JSON.parse(fetchedMembers)
  

  return <>
    <Head>
      <title>About us</title>
    </Head>
    <NavBar imageUrl={imageUrl}/>
    <Heading m={5} color='blue.300' textAlign={'center'}>
      Our Team
    </Heading>
    <VStack spacing={10}>
    {
      members.map(member => {
        return (
          <>
          <Box display={{ base: 'none', md:'block'}} maxW='90%' m='auto' boxShadow={'xl'}>
              <SimpleGrid pr={10} columns={3} rows={1}>
                <GridItem m='auto'>
                  <Box width='fit-content'>
                    <SkeletonCircle boxSize={'150px'} zIndex="10" isLoaded={Loading}>
                      <Image position='relative' boxSize='150px' onLoad={() => { isLoading(true) }} objectFit={'cover'} borderRadius={'50%'} src={member.image}/>
                    </SkeletonCircle>
                    <Text p={2} textAlign={'center'}>
                      {member.role}
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <VStack py={5}>
                    <Heading textAlign='left' width='100%' fontSize={'2xl'}>
                      {member.name}
                    </Heading>
                    <Text>
                      {member.message}
                    </Text>
                    {
                      authenticated && <Button _focus={{outline:'none'}} alignSelf='center' variant={'solid'} borderRadius={'10px'}>
                      <EditIcon />
                      <Text ml={2}>Edit</Text>
                    </Button>
                    }
                  </VStack>
                </GridItem>
              </SimpleGrid>
            </Box>
            <Center display={{ base: 'block', md:'none'}} py={6}>
              <Box
                maxW={'270px'}
                w={'full'}
                margin='auto'
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                  <Image
                    onLoad={() => { isLoading(true) }}
                    h={'120px'}
                    w={'full'}
                    src={
                      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit={'cover'}
                  />
              <Flex justify={'center'} mt={-12}>
                
                  <Avatar
                    size={'xl'}
                    src={
                      member.image
                    }
                    alt={'Author'}
                    css={{
                      border: '2px solid white',
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                      {
                        member.name
                      }
                    </Heading>
                    <Text color={'gray.500'}>{
                      member.role
                    }</Text>
                  </Stack>
                  <Button
                    _focus={{outline:'none'}}
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}>
                    Know More
                  </Button>
                </Box>
              </Box>
            </Center>
          </>
        )
      })}
    </VStack>
  </>;
}



export async function getServerSideProps() {
  const snapshot = await getDocs(query(collection(db, 'members'),orderBy('timestamp','asc')));
  const data = []
  snapshot.docs.map((project) => {
    data.push(project.data());
  })
  console.log(data);
 return {
    props: {
      fetchedMembers: JSON.stringify(data)
    }
  }
}