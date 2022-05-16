import { Box } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  where
} from '@firebase/firestore';
import { db } from '../../../services/firebase';
import { Image, Text, Heading, Button, Center } from '@chakra-ui/react';
import NavBar from "../../../components/navbar";
import { query as FireQuery } from '@firebase/firestore';
import router from 'next/router'
import Head from 'next/head';

export default function VisionId({ document }) {
  const info = JSON.parse(document)
  return (
    <>
      <Head>
        <title>{info.title}</title>
      </Head>
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
              localStorage.getItem('image') && <Button _focus={{ outline: 'none' }} onClick={() => { router.push(`/edit/project/${info.id}`) }} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{ backgroundPosition: "100%", color: 'white' }} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
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


export async function getStaticProps(context) {
  const getDoc = await getDocs(FireQuery(collection(db, 'project_updates'), where('id', '==', context.params.projectid)));

  const fetchedDoc = getDoc.docs.map(item => item.data())



  return {
    props: {
      document: JSON.stringify(fetchedDoc[0])
    },
    revalidate: 1 * 60 * 60 * 24 * 7 // 1 second * 60 seconds = 1 minutes * 60 = 1 hr * 24 = 24hrs * 7 = one week for every blog update checking.
  }
}


export async function getStaticPaths() {

  const vision = await getDocs(collection(db, 'project_updates'));
  const visionIds = vision.docs.map(vision => vision.data().id)

  const paths = visionIds.map((id) => ({ params: { projectid: id } }))

  // debugging
  // console.log('Printing Paths => ', paths)

  return {
    paths, fallback: false
  }
}


// export async function getServerSideProps({ query }) {
//   let document = {}
//   const user = await getDocs(FireQuery(collection(db, 'project_updates'),where('id', '==', query.projectid)));
//   user.docs.map(item => {
//     const data = item.data()
//     document = data;
//   });

//   return {
//     props: {
//       document: JSON.stringify(document)
//     }
//   };
// }
