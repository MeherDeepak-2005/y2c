import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { MdAccountCircle } from 'react-icons/md'
import router from 'next/router';



function ThemeToggleButton() {
  const { toggleColorMode } = useColorMode()
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div style={{display: 'inline-block'}} key={useColorModeValue('light','dark')} animate={{y:0,opacity:1}} exit={{y:20,opacity: 0}} transition={{duration:0.2}}>
        <IconButton aria-label='Toggle theme' colorScheme={useColorModeValue('purple', 'orange')} icon={<MdAccountCircle/>} onClick={()=>{router.push('/signup')}}>
        </IconButton>
      </motion.div>
    </AnimatePresence>
  )
}
export default ThemeToggleButton