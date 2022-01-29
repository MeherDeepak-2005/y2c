import { IconButton, useColorMode, useColorModeValue,Image } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdAccountCircle } from 'react-icons/md'
import router from 'next/router';
import Cookies from 'js-cookie'

function ThemeToggleButton() {
  let imageUrl = null;

  if (typeof window !== 'undefined') {
      imageUrl = localStorage.getItem('image')
  }
  
  
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div style={{ display: 'inline-block' }} key={useColorModeValue('light', 'dark')} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
        {
          imageUrl ? (
              <IconButton bg='white' aria-label='Account' icon={<Image boxSize='30px' objectFit={'cover'} objectPosition='center' borderRadius="full" src={imageUrl}/>} onClick={()=>{router.push('/profile')}}>
          </IconButton>
          ): (
             <IconButton bg='white' aria-label='Account' icon={<MdAccountCircle size='30px'/>} onClick={()=>{router.push('/signup')}}>
            </IconButton>
          )
        }
        
      </motion.div>
    </AnimatePresence>
  )
}
export default ThemeToggleButton
