// import {
//   Box,
//   VStack,
//   FormLabel,
//   Input,
//   Button,
//   SimpleGrid,
//   Heading,
//   Link,
//   Textarea
// } from '@chakra-ui/react';
// import { useState } from 'react';
// import { PhoneIcon,EmailIcon } from '@chakra-ui/icons';
// import { motion,AnimatePresence } from 'framer-motion';

// function Contact() {

//   const [input, setInput] = useState('');
//   const [message, setMessage] = useState('');
//   const [name,setName] = useState('')

//   const handleInputChange = (e) => setInput(e.target.value);
//   const handleMessageChange = (e) => setMessage(e.target.value);
//    const handleNameChange = (e) => setName(e.target.value);

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     setLoading(true);
//     e.preventDefault();
//     console.log('Submitted');
//     setLoading(false)
//   }


//   return <SimpleGrid spacing={10} maxW='80%' w='50%' m='auto' columns={[1, 1]}>
//     <AnimatePresence initial={true}>
//     <motion.div initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         transition={{ duration: 2 }}
//         variants={{
//           visible: { opacity: 1,y:0 },
//           hidden: { opacity: 0,y:40 }
//         }}>
//     <Box mb={[0,10]} h={['50vh','60vh']} bg='black'>
//       <VStack spacing={10}>
//         <Heading mt={10} fontWeight={100} color='white'>
//           Yes.You.Can.
//         </Heading>
//         <Heading fontSize='2vw' w='100%' textAlign='center' mt={20} color='white'>
//           We&#39;d love to hear from you
//         </Heading>
//         <VStack p={10} spacing={10}>
//         <Link passHref href='tel:7002245200' >
//           <Button leftIcon={<PhoneIcon />} colorScheme="teal" variant="outline">
//             Call us
//           </Button>
//         </Link>
//         <Link passHref href='mailto:project.y2c@gmail.com'>
//           <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="outline">
//             Email
//           </Button>
//         </Link>
//         </VStack>
//       </VStack>
//         </Box>
//       </motion.div>
//     </AnimatePresence>
//     <AnimatePresence initial={true}>
//     <motion.div initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         transition={{ duration: 2 }}
//         variants={{
//           visible: { opacity: 1,y:0 },
//           hidden: { opacity: 0,y:40 }
//         }}>
//       <form onSubmit={(e) => {handleSubmit(e)}}>
//         <FormLabel htmlFor='email'>
//           Name
//         </FormLabel>
//         <Input mb={5} required border='none' borderBottom='3px solid black' type="name" placeholder="Your Name" id='email' onChange={handleNameChange}/>
//         <FormLabel htmlFor='email'>
//           Email
//         </FormLabel>
//         <Input mb={5} required border='none' borderBottom='3px solid black' type="email" placeholder="Email Address" id='email' onChange={handleInputChange}/>
//         <FormLabel htmlFor='message'>
//           Message
//         </FormLabel>
//         <Textarea required border='none' borderBottom='3px solid black' type="text" placeholder="Message" id='message' onChange={handleMessageChange} />
//         <Button mt={10} isLoading={loading} type='submit' colorScheme='teal'>
//           Submit
//         </Button>
//       </form>
//     </motion.div>
//     </AnimatePresence>
//   </SimpleGrid>
// }

// export default Contact;
import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Image,
  HStack,
  Heading
} from '@chakra-ui/react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import {
  addDoc,
  collection
} from '@firebase/firestore';
import { db } from '../services/firebase';
import { useState } from 'react';


const Logo = (props) => {
  return (
    <HStack>
      <Image boxSize={30} borderRadius="full" src='Logo.jpeg' />
      <Heading fontSize='1rem'>Project Y2C</Heading>
    </HStack>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithNewsletter() {
  const [email,setEmail] = useState('')
  const handleEmailSubmission = async () => {
    const docRef = await addDoc(collection(db, 'newsletter'), {
      email: email
    })
    alert("Thanks for subscribing!")
  }
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue('gray.700', 'white')} />
            </Box>
            <Text fontSize={'sm'}>
              © {new Date().getFullYear()}. Project Y2C. All rights reserved
            </Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'YouTube'} href={'https://www.linkedin.com/in/y2c-project-67ba2722a/'}>
                <FaLinkedin />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'https://www.instagram.com/project_y2c_/'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Organisation</ListHeader>
            <Link href={'#'}>About us</Link>
            <Link href={'#'}>Contact us</Link>
            <Link href={'#'}>Our Vision</Link>
            <Link href={'#'}>Project Updates</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Donate</Link>
            <Link href={'#'}>Sponsor</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                onChange={(e) => {setEmail(e.target.value)}}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                onClick={handleEmailSubmission}
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}