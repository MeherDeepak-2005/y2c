import {
  Box,
  Image,
  Text,
  Heading
} from '@chakra-ui/react';


function Card({heading,src}) {
  return (
    <Box borderRadius={10} p={3} boxShadow={'2xl'} m={10} w='25vw'>
      <Heading w='100%' fontSize='2.5vw' textAlign={'center'}>{heading}</Heading>
      <Image borderRadius='xl' m='auto' h='25rem' w='100%' objectFit={'cover'} objectPosition={'bottom'} loading="lazy" src={src}/>
    </Box>
  );
}

export default Card;
