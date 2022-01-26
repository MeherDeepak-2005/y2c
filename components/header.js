import { Container,Box, Heading,Text,Button,Image,VStack,SimpleGrid,GridItem } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion'
import { useColorModeValue } from '@chakra-ui/react';

function Header() {
  const buttonBg = useColorModeValue("linear-gradient(120deg, white 0%, white 50%, teal 50%)", 'linear-gradient(120deg, transparent 0%,#000 50%, teal 50%)')
  
  return (
    <>
      <AnimatePresence>
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{y:-20,opacity:0}} transition={{ duration: 1 }}>
          <VStack justifyContent='center' position='relative' h='fit-content'>
              <Box h='100%' width='100%' columns={[1, 1, 2]} rows={[2, 2, 1]} h='60vh' w='100%' mx='auto' mb={0} bgPosition='center' bgImage='https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' filter='brightness(50%)'>
            </Box>
            <Heading position='absolute' color='white' zIndex={10}>
                <AnimatePresence initial={true}>
                <motion.div initial={{ y: 20,opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{y:-20,opacity:0}} transition={{ duration: 2 }}>
                  Lorem ipsum dolor
                  </motion.div>
                </AnimatePresence>
              </Heading>
            </VStack>
          </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Header
