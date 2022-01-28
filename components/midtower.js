
import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, HStack, Image, VStack,
  SimpleGrid,GridItem
} from '@chakra-ui/react';
import { Heading,IconButton,Text } from '@chakra-ui/react'
import { ChevronLeftIcon,ChevronRightIcon } from '@chakra-ui/icons';
import Svg from './midtower-svg';


function midtower() {
  const links = [
    { url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',text:'The first time we visited Adharna orphange.. Had a really fun time with the kids and got to know them and improved our plans.' },
    {url:'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',text:'We changed our plans and visited adharna orphanage and assessed each kid to give him/her personal training' },
   { url:'https://images.unsplash.com/photo-1601807576163-587225545555?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGVkdWNhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',text:'This is some random text' },
    { url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGVkdWNhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60', text: 'this is annoymous text' }
  ]
  const [selectedImage, setSelectedImage] = useState(links[0]);
  const [infoIndex, setInfoIndex] = useState(0);

  const manageInfoIndex = () => {
    if (infoIndex === 0) {
      return null;
    }
    else {
      setInfoIndex(infoIndex - 1);
      setSelectedImage(links[infoIndex - 1]);
    }
  }
   const manageInfoRightIndex = () => {
    if (infoIndex === links.length - 1) {
      return null;
    }
    else {
      setInfoIndex(infoIndex +1);
      setSelectedImage(links[infoIndex +1]);
    }
  }

  return (
    <Box position='relative'>
      <Heading w='100%' textAlign='center' mt={3}>
        Our Vision
      </Heading>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}>
        <Text mx='auto' mt={5} mb={2} h='3rem' w='65%' textAlign='left' fontSize={['3vw','1.5vw']}>
          {selectedImage.text}
        </Text>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}>
        <Svg />
        
      </motion.div>
      {/* Only for desktop/tablet */}
      <SimpleGrid display={{base:'none',md:'grid'}} m={5} mb={10} spacing={10} overflow='hidden' columns={5} rows={1}>
        <GridItem colSpan={1} m='auto'>
          <HStack transform='translateX(-1rem)'>
              {
                links.slice(infoIndex-2 || infoIndex-1, infoIndex).map(link => {
                  return (
                    <Image key={link.url} opacity="0.3" onClick={() => { setSelectedImage(link);setInfoIndex(links.indexOf(link))}} height='fit-content' width='10rem' objectFit='contain' src={link.url} />
                  )
                })
              }
          </HStack>
        </GridItem>
        <GridItem colSpan={3}>
          <HStack justifyContent='center'>
            <IconButton _hover={{ bg: 'white' }} onClick={() => { manageInfoIndex() }} bg='white' size='sm' as={ChevronLeftIcon} /> 
            <Box width='30vw' height='30vh' maxW='50rem' maxH='50rem'>
              <AnimatePresence exitBeforeEnter initial={false}>
                <motion.img
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 2}}
                  variants={{
                    visible: { display: 'inline-block' },
                    hidden: { display: 'none' }
                  }}
                  style={{ objectFit: 'cover', zIndex: "1" }} key={selectedImage.url} initial={{ opacity: 0, x: 20, y: 2 }} transition={{ duration: '0.4' }} animate={{ x: 0, y: 0, opacity: 1 }} src={selectedImage.url}></motion.img>
              </AnimatePresence>
            </Box>
            <IconButton _hover={{ bg: 'white' }} onClick={() => { manageInfoRightIndex() }} bg='white' size='sm' as={ChevronRightIcon} />
          </HStack>
        </GridItem>
        <GridItem colSpan={1} m='auto'>
          <HStack>
            {
              links.slice(infoIndex+1, links.length).map(link => {
                return (
                  <Image key={link.url} opacity="0.3" onClick={() => { setSelectedImage(link);setInfoIndex(links.indexOf(link))}} height='fit-content' width='10rem' objectFit='contain' src={link.url} />
                )
              })
            }
          </HStack>
        </GridItem>
      </SimpleGrid>
      {/* Only for mobile */}
      <HStack display={{base:'flex',md:'none'}} mb={5} alginItems='center' justifyContent='space-evenly'>
        <IconButton onClick={()=> {manageInfoIndex()}} as={ChevronLeftIcon} />
        <Box height='20vh' width='85%'>
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.img style={{objectFit:'cover',zIndex:"1",height:'100%',width:'100%'}} key={selectedImage.url} initial={{opacity:0,x:20,y:2}} transition={{duration:'1'}} animate={{x: 0,y:0,opacity:1}} src={selectedImage.url}></motion.img>
          </AnimatePresence>
        </Box>
        <IconButton onClick={() => { manageInfoRightIndex() }} as={ChevronRightIcon}/>
      </HStack>
    </Box>
  )
}

export default midtower;

