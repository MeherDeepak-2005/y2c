
import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, HStack, Image, VStack,Center,
  SimpleGrid,GridItem
} from '@chakra-ui/react';
import { Heading,IconButton,Text } from '@chakra-ui/react'
import { ChevronLeftIcon,ChevronRightIcon } from '@chakra-ui/icons';
import Svg from './midtower-svg';
import { useEffect } from 'react';
import { onSnapshot, query, collection,where } from 'firebase/firestore';
import { db } from '../services/firebase';




function midtower() {

  let links = [
    { image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',text:'The first time we visited Adharna orphange.. Had a really fun time with the kids and got to know them and improved our plans.' }
  ]

  useEffect(() => {
    onSnapshot((collection(db, 'project_updates')), snapshot => {
      const data = snapshot.docs;
      links = []
      data.map(item => {
        console.log(item.data())
        links.push(item.data())
      })
    })
  },[])
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
    <Box minHeight='40vh' mb={20} position='relative' height='fit-content'>
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
        
      </motion.div>
      {/* Only for desktop/tablet */}
      <SimpleGrid w={'95%'} display={{ base: 'none', md: 'grid' }} mt={10} spacing={1} overflow='hidden' columns={6} rows={1}>
        <GridItem colSpan={3}>
          <AnimatePresence>
            <motion.div
            initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={{
            visible: { opacity: 1, x:0,y:0 },
            hidden: { opacity: 0, x:-40,y:20 }
              }}>
              <HStack alignItems='center' justifyContent='center'>
            <IconButton _hover={{ bg: 'white' }} onClick={() => { manageInfoIndex() }} bg='white' size='sm' as={ChevronLeftIcon} /> 
            <Box>
              <AnimatePresence exitBeforeEnter initial={false}>
                <motion.img
                  style={{ objectFit: 'cover', zIndex: "1"}} key={selectedImage.image} initial={{ opacity: 0, x: 20, y: 2 }} transition={{ duration: '0.4' }} animate={{ x: 0, y: 0, opacity: 1 }} src={selectedImage.image}></motion.img>
                </AnimatePresence>
            </Box>
            <IconButton _hover={{ bg: 'white' }} onClick={() => { manageInfoRightIndex() }} bg='white' size='sm' as={ChevronRightIcon} />
          </HStack>
                  </motion.div>
          </AnimatePresence>
        </GridItem>
        <GridItem colSpan={3}>
          <AnimatePresence>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 40 }
              }}>
               <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quos illum vero numquam quisquam sunt corporis incidunt officiis! Aperiam praesentium impedit facilis laboriosam at corporis assumenda tempora adipisci, saepe quos.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eveniet molestiae vel quasi? Perferendis sequi facilis exercitationem beatae temporibus voluptate quam inventore! Repellendus harum reiciendis similique praesentium iste odit. Autem!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quos eaque dolore ducimus quia rem numquam dolor dolorem porro at enim commodi minima molestiae amet, cupiditate ab incidunt corrupti aliquam.
              </Text>
            </motion.div>
          </AnimatePresence>
        </GridItem>
      </SimpleGrid>
      {/* Only for mobile */}
      <HStack display={{base:'flex',md:'none'}} mb={5} alginItems='center' justifyContent='space-evenly'>
        <IconButton onClick={()=> {manageInfoIndex()}} as={ChevronLeftIcon} />
        <Box height='20vh' width='85%'>
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.img style={{objectFit:'cover',zIndex:"1",height:'100%',width:'100%'}} key={selectedImage.image} initial={{opacity:0,x:20,y:2}} transition={{duration:'1'}} animate={{x: 0,y:0,opacity:1}} src={selectedImage.image}></motion.img>
          </AnimatePresence>
        </Box>
        <IconButton onClick={() => { manageInfoRightIndex() }} as={ChevronRightIcon}/>
      </HStack>
    </Box>
  )
}

export default midtower;


