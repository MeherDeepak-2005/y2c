import {
  Box,
  Image,
  Text,
  Heading
} from '@chakra-ui/react';


function Card({heading,src}) {
  return (
    <Box minW='20rem' borderRadius={10} p={3} h='fit-content' boxShadow={'2xl'} m={10} w='25vw'>
      <Heading w='100%' fontSize='2rem' textAlign={'center'}>{heading}</Heading>
      <Image borderRadius='xl' m='auto' h='25rem' w='100%' objectFit={'contain'} objectPosition={'bottom'} loading="lazy" src={src}/>
    </Box>
  );
}

export default Card;
