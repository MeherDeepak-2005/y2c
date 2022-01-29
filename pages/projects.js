import React from 'react';
import { getDocs, collection } from '@firebase/firestore';
import { db } from '../services/firebase';
import { Box,Text,Image,Button,VStack } from '@chakra-ui/react';
import NavBar from '../components/navbar';

function projects({ fetchedProjects }) {
  const projects = JSON.parse(fetchedProjects);
  return (
    <>
      <NavBar />
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
      <Button onClick={() => { router.push(`/view/vision/${project.id}`) }} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{ backgroundPosition: "100%", color: 'white' }} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
        Read more <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{ marginLeft: ".5rem" }}>&rarr;</Text>
      </Button>
      </VStack>
    </Box>
            )
          }
        )
      }
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
