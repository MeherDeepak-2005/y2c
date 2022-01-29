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
              <Box h='100%' width='100%' columns={[1, 1, 2]} rows={[2, 2, 1]} h='60vh' w='100%' mx='auto' mb={0} bgPosition='top' bgImage='bg.jpeg' bgSize='cover' filter='brightness(50%)'>
            </Box>
            <Heading maxW='60%' fontSize='3xl' position='absolute' color='white' zIndex={10}>
                <AnimatePresence initial={true}>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 2 }}>
                  "Smallest act of kidness is worth more than the greatest intention."
                  <Text textAlign='right' fontSize='lg'> - Kahlil Gibran</Text>
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
