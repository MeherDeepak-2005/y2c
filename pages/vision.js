import React from 'react';
import { getDocs, collection } from '@firebase/firestore';
import { db } from '../services/firebase';
import { Box,Text,Image,Button,VStack,Flex } from '@chakra-ui/react';
import NavBar from '../components/navbar';
import Link from 'next/link';

function Visions({ fetchedProjects }) {
  const projects = JSON.parse(fetchedProjects);
  return (
    <>
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
                      localStorage.getItem('image') && <Button _focus={{outline:'none'}} onClick={() => { router.push(`/edit/vision/${project.id}`) }} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{ backgroundPosition: "100%", color: 'white' }} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
        Edit <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{ marginLeft: ".5rem" }}>&rarr;</Text>
      </Button>
                    ) : (
                        <></>
                    )
                    
                  }
                  <Link href={`/view/vision/${project.id}`} passHref>
                  <Button _focus={{outline:'none'}} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{ backgroundPosition: "100%", color: 'white' }} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
        Read more <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{ marginLeft: ".5rem" }}>&rarr;</Text>
                    </Button>
                    </Link>
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

export default Visions;


export async function getServerSideProps() {
  const projects = []

  const resProjects = await getDocs(collection(db, 'visions'))

  resProjects.docs.map(doc => projects.push(doc.data()))
  return {
    props: {
      fetchedProjects: JSON.stringify(projects)
    }
  }
}
