import React from 'react';
import { getDocs, collection } from '@firebase/firestore';
import { db } from '../services/firebase';
import { Box,Text,Image,Button,VStack,Flex,Link } from '@chakra-ui/react';
import NavBar from '../components/navbar';
import NextLink from 'next/link';
import Head from 'next/head';
import router from 'next/router';

function projects({ fetchedProjects }) {
  const projects = JSON.parse(fetchedProjects);
    const LinkItem = ({ href, path, _target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  
  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={active ? 'grassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
        _target={_target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
  }
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <NavBar />
      <Flex flexDirection='row' wrap={'wrap'}>
      {
        projects.map(
          project => {
            return (
              <Box boxShadow='lg' p={5} key={project.id} m={10} height='fit-content' width={{ base: '90vw', md: '20vw' }} overflow={'hidden'}>
    <VStack>
      <Image width='100%' objectFit={'cover'} height='50%' src={project.image}></Image>
      <Text>
        {project.message.slice(0,200)}...
      </Text>
        {
                    typeof window !== 'undefined' ? (
                      localStorage.getItem('image') && <Button _focus={{outline:'none'}} onClick={() => { router.push(`/edit/project/${project.id}`) }} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{ backgroundPosition: "100%", color: 'white' }} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
        Edit <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{ marginLeft: ".5rem" }}>&rarr;</Text>
      </Button>
                    ) : (
                        <></>
                    )
                    
                  }
                  <NextLink passHref href={`/view/project/${project.id}`}>
                    <Link _hover={{textDecoration: 'none'}}>
                  <Button _focus={{outline:'none'}} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{ backgroundPosition: "100%", color: 'white' }} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
                    
                      Read more
                    <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{ marginLeft: ".5rem" }}>&rarr;</Text>
                      </Button>
                      </Link>
                    </NextLink>
                    
      </VStack>
    </Box>
            )
          }
        )
        }
        </Flex>
    </>
  )
  
}

export default projects;


export async function getServerSideProps() {
  const projects = []

  const resProjects = await getDocs(collection(db, 'project_updates'))

  resProjects.docs.map(doc => projects.push(doc.data()))
  return {
    props: {
      fetchedProjects: JSON.stringify(projects)
    }
  }
}
