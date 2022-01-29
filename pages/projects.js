import React from 'react';
import { getDocs, collection } from '@firebase/firestore';
import { db } from '../services/firebase';
import { Box,Text,Image } from '@chakra-ui/react';


function projects({projects}) {
  return <Box m={10} height='50vh' width={{base: '90vw',md: '20vw'}} overflow={'hidden'}>
    <Image width='100%' height='50%' src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=911&q=80"></Image>
  </Box>;
}

export default projects;


export async function getServerSideProps() {
  const projects = []

  const resProjects = await getDocs(collection(db, 'project_updates'))

  resProjects.docs.map(doc => projects.push(doc.data()))
  return {
    props: {
      projects: JSON.stringify(projects)
    }
  }
}
