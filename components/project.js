
import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, HStack, VStack,
  SimpleGrid,GridItem,Button
} from '@chakra-ui/react';
import { Heading,IconButton,Text } from '@chakra-ui/react'
import { ChevronLeftIcon,ChevronRightIcon } from '@chakra-ui/icons';
import router from 'next/router';
import Link from 'next/link';


function Project({ links }) {
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
          Project Updates
        </Heading>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
                  visible: { opacity: 1, x: 0, y: 0 },
                  hidden: { opacity: 0, x: -40, y: 20 }
                }}>
                <HStack alignItems='center' justifyContent='center'>
                  <IconButton _focus={{outline:'none'}} _hover={{ bg: 'white' }} onClick={() => { manageInfoIndex() }} bg='white' size='sm' as={ChevronLeftIcon} />
                  <Box>
                    <AnimatePresence exitBeforeEnter initial={false}>
                      <motion.img
                        style={{ objectFit: 'cover', zIndex: "1" }} key={selectedImage.image} initial={{ opacity: 0, x: 20, y: 2 }} transition={{ duration: '0.4' }} animate={{ x: 0, y: 0, opacity: 1 }} src={selectedImage.image}></motion.img>
                    </AnimatePresence>
                  </Box>
                  <IconButton _focus={{outline:'none'}} _hover={{ bg: 'white' }} onClick={() => { manageInfoRightIndex() }} bg='white' size='sm' as={ChevronRightIcon} />
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
                  {selectedImage.message}
                </Text>
                <VStack alignItems='flex-end'>
                {
                    typeof window !== 'undefined' ? (
                      localStorage.getItem('image') && <Button _focus={{outline:'none'}} onClick={() => { router.push(`/edit/project/${document.id}`) }} role='group' variant='outline' transition='all .2s' _hover={{ backgroundPosition: '100%', color: 'gray.800' }} backgroundImage='linear-gradient(240deg, white 0%,#fff 50%, salmon 50%)' backgroundSize='230%' backgroundPosition='0%'>
        Edit <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{ marginLeft: ".5rem" }}>&rarr;</Text>
      </Button>
                    ) : (
                        <></>
                    )
                    
          }
                <Link passHref href={`/view/project/${selectedImage.id}`}>
                  <Button _focus={{ outline: 'none' }} mt={10} role='group' transition='all .2s' _hover={{ backgroundPosition: '100%', color: 'gray.800' }} backgroundImage='linear-gradient(240deg, white 0%,#fff 50%, salmon 50%)' backgroundSize='230%' backgroundPosition='0%'>
                    
        <Text>
          <HStack>
            <Text>Read more</Text>
            <Text transition='all .2s ease-in' _groupHover={{marginLeft: '1rem'}}>&rarr;</Text>
          </HStack>
        </Text>
                  </Button>
                  </Link>
                  </VStack>
              </motion.div>
            </AnimatePresence>
          </GridItem>
        </SimpleGrid>
        {/* Only for mobile */}
        <SimpleGrid m='auto' w={'95%'} display={{ base: 'grid', md: 'none' }} mt={10} spacing={1} overflow='hidden' columns={{base: 1, md: 1}} rows={{ base:2,md:1}}>
        <HStack display={{ base: 'flex', md: 'none' }} mb={5} alginItems='center' justifyContent='space-evenly'>
          <IconButton _focus={{outline:'none'}} onClick={() => { manageInfoIndex() }} as={ChevronLeftIcon} />
          <Box height='20vh' width='85%'>
            <AnimatePresence exitBeforeEnter initial={false}>
              <motion.img style={{ objectFit: 'cover', zIndex: "1", height: '100%', width: '100%' }} key={selectedImage.image} initial={{ opacity: 0, x: 20, y: 2 }} transition={{ duration: '0.6' }} animate={{ x: 0, y: 0, opacity: 1 }} src={selectedImage.image}></motion.img>
            </AnimatePresence>
          </Box>
          <IconButton _focus={{outline:'none'}} onClick={() => { manageInfoRightIndex() }} as={ChevronRightIcon} />
          </HStack>
          <GridItem>
            <VStack>
            <Text maxW='94%' m='auto'>
              {selectedImage.message.slice(0,300)}......
              </Text>
              {
                    typeof window !== 'undefined' ? (
                      localStorage.getItem('image') && <Button _focus={{outline:'none'}} onClick={() => { router.push(`/edit/project/${document.id}`) }} role='group' variant='outline' borderBottom='.2rem solid teal' transition='all .2s' _hover={{ backgroundPosition: "100%", color: 'white' }} backgroundSize='230%' bgImage={'linear-gradient(120deg, white 0%, white 50%, teal 50%)'}>
        Edit <Text transition='all .2s ease-in' ml='.3rem' _groupHover={{ marginLeft: ".5rem" }}>&rarr;</Text>
      </Button>
                    ) : (
                        <></>
                    )
                    
          }
              <Link href={`/view/project/${selectedImage.id}`}>
            <Button _focus={{outline:'none'}} role='group' transition='all .2s' _hover={{backgroundPosition: '100%',color:'gray.800'}} backgroundImage='linear-gradient(240deg, white 0%,#fff 50%, salmon 50%)' backgroundSize='230%' backgroundPosition='0%'>
        <Text>
          <HStack>
            <Text>Read more</Text>
            <Text transition='all .2s ease-in' _groupHover={{marginLeft: '1rem'}}>&rarr;</Text>
          </HStack>
        </Text>
                </Button>
              </Link>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </Box>
    )
}

export default Project;
