
import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box,HStack,Image,VStack } from '@chakra-ui/react';
import { Heading,IconButton,Text } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons';


function midtower() {
  const links = [
    { url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',text:'The first time we visited Adharna orphange.. Had a really fun time with the kids and got to know them and improved our plans.' },
    {url:'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',text:'We changed our plans and visited adharna orphanage and assessed each kid to give him/her personal training' },
   { url:'https://images.unsplash.com/photo-1601807576163-587225545555?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGVkdWNhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',text:'This is some random text' },
    { url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGVkdWNhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60', text: 'this is annoymous text' }
  ]
  const [selectedImage, setSelectedImage] = useState(links[0]);
  const [infoIndex, setInfoIndex] = useState(0);
  return (
    <>
      <Heading w='100%' textAlign='center' mt={3}>
        Our Vision
      </Heading>
      <Text mt={5} w='100%' textAlign='center' fontSize={['1vw','1.5vw']}>
        {selectedImage.text}
      </Text>
      <HStack display={{ base:'none',md:'flex'}}>
        <IconButton _hover={{ bg: 'white' }} onClick={() => { setSelectedImage(links[0]);setInfoIndex(0) }} ml={10} bg='white' size='sm' as={ArrowLeftIcon}/>
        <HStack>
          <Box height='fit-content' width='20rem' m={10}>
            <AnimatePresence exitBeforeEnter initial={false}>
                <motion.img key={selectedImage.url} initial={{opacity:0,x:20,y:2}} transition={{duration:'0.4'}} animate={{x: 0,y:0,opacity:1}} src={selectedImage.url}></motion.img>
            </AnimatePresence>
          </Box>
        <HStack>
        </HStack>
          {
            links.slice(infoIndex+1,links.length).map(link => {
              return (
                <Image onClick={() => { setSelectedImage(link);setInfoIndex(links.indexOf(link))}} height='fit-content' width='10rem' objectFit='contain' src={link.url} />
              )
            })
          }
        </HStack>
      </HStack>
      <VStack display={{ base:'flex',md:'none'}}>
        <VStack>
          <Box height='fit-content' width='80%' m={10}>
            <AnimatePresence exitBeforeEnter initial={false}>
                <motion.img key={selectedImage.url} initial={{opacity:0,x:20,y:2}} transition={{duration:'0.4'}} animate={{x: 0,y:0,opacity:1}} src={selectedImage.url}></motion.img>
            </AnimatePresence>
          </Box>
        <VStack>
        </VStack>
          {
            links.slice(infoIndex+1,links.length).map(link => {
              return (
                <Image onClick={() => { setSelectedImage(link);setInfoIndex(links.indexOf(link))}} height='fit-content' width='65%' objectFit='contain' src={link.url} />
              )
            })
          }
        </VStack>
      </VStack>
    </>
  )
}

export default midtower;
