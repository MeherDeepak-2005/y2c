import React from 'react';
import { Box,VStack, Text,Heading,Image } from '@chakra-ui/react';

function starter() {
  return <Box>
      <VStack>
        <Image
        src="Logo.jpeg"
        height='40vh'
        width='25rem'
        minW='20rem'
        />
        <Heading fontSize='2vw' fontWeight={1}>
          Project Y2C
        </Heading>
      </VStack>
    </Box>;
}

export default starter;
