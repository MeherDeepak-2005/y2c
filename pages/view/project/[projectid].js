import { Box } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  where
} from '@firebase/firestore';
import { db } from '../../../services/firebase';
import { Image,Text,Heading,Button,Center } from '@chakra-ui/react';
import NavBar from "../../../components/navbar";
import { query as FireQuery } from '@firebase/firestore';
import router from 'next/router'
export default function VisionId({ document }) {
  const info = JSON.parse(document)
  return (
    <>
      <NavBar />
    <Box>
      <Image m='auto' objectFit={'cover'} w='90vw' h='50vh' src={info.image}></Image>
      <Heading w='fit-content' m='auto' my={5}>
        {
          info.title
        }
      </Heading>
      <Text maxW='90vw' m='auto'>
        {
          info.message
        }
        </Text>
        <Center m={10}>

        
          {
                    typeof window !== 'undefined' ? (
                      localStorage.getItem('image') && <Button _focus={{outline:'none'}} onClick={() => { router.push(`/edit/project/${document.id}`) }} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{ backgroundPosition: "100%", color: 'white' }} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
        Edit <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{ marginLeft: ".5rem" }}>&rarr;</Text>
      </Button>
                    ) : (
                        <></>
                    )
                    
          }
          </Center>
      </Box>
    </>
  )
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
