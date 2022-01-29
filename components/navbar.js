import ThemeToggleButton from '../helpers/theme-toggle-button';
import {
  HStack, Box, IconButton,Heading, Flex, Icon, Image, MenuList,Menu,MenuButton,MenuItem,Link, Text} from '@chakra-ui/react';
import { AnimatePresence,motion } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import router from 'next/router';

function NavBar({imageUrl}) {
  const LinkItem = ({ href, path, _target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  
 

  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={active ? 'grassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
        _target={_target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
  }
  
  const logo = () => {
    return <Image w='3rem' m={1} src='https://y2c-two.vercel.app/Logo.jpeg'/>
  }
  return (
    <AnimatePresence>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{y:-20,opacity:0}} transition={{ duration: 1 }}>
        <HStack bg='white' zIndex={1000} bg='white' justifyContent='space-between' w='100%' m='auto'>
          <Flex alignItems='center' flexDirection='row'>
            <IconButton as={logo}/>
            <Heading cursor='pointer' onClick={()=> {router.push('/')}}  fontSize={20} variant='page-title'>Yes.You.Can</Heading>
            <HStack ml='2rem' spacing={5} display={{ base: 'none', md: 'flex' }}>
              <NextLink role='group' href='/vision'>
                <Link>Our Vision</Link>
              </NextLink>
              <NextLink href='/projects'>
                <Link>Projects</Link>
              </NextLink>
              <NextLink href='/about'>
                <Link>About us</Link>
              </NextLink>
              <NextLink href='https://meherdeepak-2005.github.io/donate-y2c'>
                <Link>
                  Donate
                </Link>
              </NextLink>
          </HStack>
          </Flex>
          <HStack spacing={5}>
            <ThemeToggleButton imageUrl={imageUrl}/>
            <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy={true} id="navbar-menu">
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  aria-label="Options"
                />
                <MenuList>
                  <NextLink href="/vision" passHref>
                    <MenuItem as={Link}>Our Vision</MenuItem>
                  </NextLink>
                  <NextLink href="/projects" passHref>
                    <MenuItem as={Link}>Projects</MenuItem>
                  </NextLink>
                  <NextLink href="/about" passHref>
                    <MenuItem as={Link}>About us</MenuItem>
                  </NextLink>
                  <NextLink href='https://meherdeepak-2005.github.io/donate-y2c'>
                    <MenuItem
                    as={Link}>
                    Donate
                    </MenuItem>
                  </NextLink>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </HStack>
      </motion.div>
    </AnimatePresence>
  )
}

export default NavBar

