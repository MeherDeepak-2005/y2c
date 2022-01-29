
import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, HStack, Button,
  SimpleGrid,GridItem,VStack
} from '@chakra-ui/react';
import { Heading,IconButton,Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import router from 'next/router';

import Svg from './midtower-svg';


function Vision({links}) {
  const [infoIndex, setInfoIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(links[infoIndex]);


  const manageInfoIndex = () => {
    if (infoIndex === 0) {
      return null;
    }
    else {
      setInfoIndex(infoIndex - 1);
      setSelectedImage(links[infoIndex-1]);
    }
  }
  const manageInfoRightIndex = () => {
    if (infoIndex === links.length - 1) {
      return null;
    }
    else {
      setInfoIndex(infoIndex +1);
      setSelectedImage(links[infoIndex+1]);
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
        <Svg/>
        </motion.div>
        {/* Only for desktop/tablet */}
        <SimpleGrid m='auto' w={'95%'} display={{ base: 'none', md: 'grid' }} mt={10} spacing={1} overflow='hidden' columns={{base: 1, md: 6}} rows={{ base:2,md:1}}>
          <GridItem colSpan={{base: 1,md: 3}} rowSpan={{base: 1,md: 1}}>
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
                  {selectedImage.message}
                </Text>
            <Button onClick={()=> {router.push(`/view/vision/${selectedImage.id}`)}} mt={10} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{backgroundPosition: "100%",color:'white'}} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
                  Read more <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{marginLeft:".5rem"}}>&rarr;</Text>
              </Button>
              </motion.div>
            </AnimatePresence>
          </GridItem>
          <GridItem colSpan={{base: 1,md: 3}} rowSpan={{base: 1,md: 1}}>
            <AnimatePresence>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                variants={{
                  visible: { opacity: 1, x: 0, y: 0 },
                  hidden: { opacity: 0, x: -40, y: 20 }
                }}>
                <HStack alignItems='center' justifyContent='center'>
                  <IconButton _hover={{ bg: 'white' }} onClick={() => { manageInfoIndex() }} bg='white' size='sm' as={ChevronLeftIcon} />
                  <Box>
                    <AnimatePresence exitBeforeEnter initial={false}>
                      <motion.img
                        style={{ objectFit: 'cover', zIndex: "1" }} key={selectedImage.image} initial={{ opacity: 0, x: 20, y: 2 }} transition={{ duration: '0.4' }} animate={{ x: 0, y: 0, opacity: 1 }} src={selectedImage.image}></motion.img>
                    </AnimatePresence>
                  </Box>
                  <IconButton _hover={{ bg: 'white' }} onClick={() => { manageInfoRightIndex() }} bg='white' size='sm' as={ChevronRightIcon} />
                </HStack>
              </motion.div>
            </AnimatePresence>
          </GridItem>
        </SimpleGrid>
        {/* Only for mobile */}
        <SimpleGrid m='auto' w={'95%'} display={{ base: 'grid', md: 'none' }} mt={10} spacing={1} overflow='hidden' columns={{base: 1, md: 1}} rows={{ base:2,md:1}}>
        <HStack display={{ base: 'flex', md: 'none' }} mb={5} alginItems='center' justifyContent='space-evenly'>
          <IconButton onClick={() => { manageInfoIndex() }} as={ChevronLeftIcon} />
          <Box height='20vh' width='85%'>
            <AnimatePresence exitBeforeEnter initial={false}>
              <motion.img style={{ objectFit: 'cover', zIndex: "1", height: '100%', width: '100%' }} key={selectedImage.image} initial={{ opacity: 0, x: 20, y: 2 }} transition={{ duration: '1' }} animate={{ x: 0, y: 0, opacity: 1 }} src={selectedImage.image}></motion.img>
            </AnimatePresence>
          </Box>
          <IconButton onClick={() => { manageInfoRightIndex() }} as={ChevronRightIcon} />
          </HStack>
          <GridItem>
            <VStack>
            <Text maxW='94%' m='auto'>
              {selectedImage.message.slice(0,300)}......
            </Text>
            <Button onClick={()=> {router.push(`/view/vision/${selectedImage.id}`)}} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{backgroundPosition: "100%",color:'white'}} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
                  Read more <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{marginLeft:".5rem"}}>&rarr;</Text>
              </Button>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </Box>
    )
}

export default Vision;
