import { Box } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  where
} from '@firebase/firestore';
import { db } from "../../services/firebase";
import { Image, Text, Heading, VStack, Center,useColorModeValue,Flex,Avatar,Stack } from '@chakra-ui/react';
import NavBar from "../../components/navbar";
import { query as FireQuery } from '@firebase/firestore';



export default function VisionId({ document }) {
  const member = JSON.parse(document)
  return (
    <>
      <NavBar />
      <VStack>
      <Image objectFit={'cover'} m='auto' boxSize="230px" borderRadius='full' src={member.image} />
      <Center>
          <Heading>
            {member.name}
        </Heading>
      </Center>
        <Center>
          {member.role}
      </Center>
      <Center>
        <Text maxW='90%'>
         {member.message}
        </Text>
        </Center>
      </VStack>
    </>
  )
}


export async function getServerSideProps({ query }) {
  let document = {}
  const user = await getDocs(FireQuery(collection(db, 'members'),where('id', '==', query.profileid)));
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
