import {
  Box,
  VStack,
  HStack,
  Text,
  Form,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
  Heading,
  Link,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';
import { PhoneIcon,EmailIcon } from '@chakra-ui/icons';


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


  return <SimpleGrid spacing={10} maxW='80%' m='auto' columns={2}>
    <Box mb={10} h='60vh' bg='black'>
      <VStack spacing={10}>
        <Heading mt={10} fontWeight={100} color='white'>
          Yes.You.Can.
        </Heading>
        <Heading fontSize='2vw' w='100%' textAlign='center' mt={20} color='white'>
          We&#39; love to hear from you
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
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <FormLabel htmlFor='email'>
          Name
        </FormLabel>
        <Input required border='none' borderBottom='3px solid black' type="name" placeholder="Your Name" id='email' onChange={handleNameChange}/>
        <FormLabel htmlFor='email'>
          Email
        </FormLabel>
        <Input required border='none' borderBottom='3px solid black' type="email" placeholder="Email Address" id='email' onChange={handleInputChange}/>
        <FormLabel htmlFor='message'>
          Message
        </FormLabel>
        <Textarea required border='none' borderBottom='3px solid black' type="text" placeholder="Message" id='message' onChange={handleMessageChange} />
        <Button mt={10} isLoading={loading} type='submit' colorScheme='teal'>
          Submit
        </Button>
      </form>
  </SimpleGrid>;
}

export default Contact;
