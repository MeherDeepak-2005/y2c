import { Box } from "@chakra-ui/react";
import {
  collection,
  getDocs
} from '@firebase/firestore';
import { db } from '../../../services/firebase';
import { Image,Text,Heading } from '@chakra-ui/react';


export default function VisionId({ document }) {
  const info = JSON.parse(document)
  return (
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
    </Box>
  )
}


export async function getServerSideProps({ query }) {
  let document = {}
  const user = await getDocs(collection(db, 'project_updates'));
  user.docs.map(item => {
    const data = item.data()
    if (data.id === query.visionid) {
      document = data;
    }
  });

  return {
    props: {
      document: JSON.stringify(document)
    }
  };
}
