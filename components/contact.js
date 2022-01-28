import {
  Box,
  VStack,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  Heading,
  Link,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';
import { PhoneIcon,EmailIcon } from '@chakra-ui/icons';
import { motion,AnimatePresence } from 'framer-motion';

function Contact() {

  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [name,setName] = useState('')

  const handleInputChange = (e) => setInput(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
   const handleNameChange = (e) => setName(e.target.value);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log('Submitted');
    setLoading(false)
  }


  return <SimpleGrid spacing={10} maxW='80%' m='auto' columns={[1, 2]}>
    <AnimatePresence initial={true}>
    <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1,y:0 },
          hidden: { opacity: 0,y:40 }
        }}>
    <Box mb={[0,10]} h={['50vh','60vh']} bg='black'>
      <VStack spacing={10}>
        <Heading mt={10} fontWeight={100} color='white'>
          Yes.You.Can.
        </Heading>
        <Heading fontSize='2vw' w='100%' textAlign='center' mt={20} color='white'>
          We&#39;d love to hear from you
        </Heading>
        <VStack p={10} spacing={10}>
        <Link passHref href='tel:7002245200' >
          <Button leftIcon={<PhoneIcon />} colorScheme="teal" variant="outline">
            Call us
          </Button>
        </Link>
        <Link passHref href='mailto:project.y2c@gmail.com'>
          <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="outline">
            Email
          </Button>
        </Link>
        </VStack>
      </VStack>
        </Box>
      </motion.div>
    </AnimatePresence>
    <AnimatePresence initial={true}>
    <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1,y:0 },
          hidden: { opacity: 0,y:40 }
        }}>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <FormLabel htmlFor='email'>
          Name
        </FormLabel>
        <Input mb={5} required border='none' borderBottom='3px solid black' type="name" placeholder="Your Name" id='email' onChange={handleNameChange}/>
        <FormLabel htmlFor='email'>
          Email
        </FormLabel>
        <Input mb={5} required border='none' borderBottom='3px solid black' type="email" placeholder="Email Address" id='email' onChange={handleInputChange}/>
        <FormLabel htmlFor='message'>
          Message
        </FormLabel>
        <Textarea required border='none' borderBottom='3px solid black' type="text" placeholder="Message" id='message' onChange={handleMessageChange} />
        <Button mt={10} isLoading={loading} type='submit' colorScheme='teal'>
          Submit
        </Button>
      </form>
    </motion.div>
    </AnimatePresence>
  </SimpleGrid>
}

export default Contact;
