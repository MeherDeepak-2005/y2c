import React from 'react';
import { BarLoader } from 'react-spinners';
import {
  Center,
  Heading,
  VStack
} from '@chakra-ui/react';

function Loading() {
  return <Center bg='white'>
    <VStack>

      <Heading>
        Loading project Updates
      </Heading>
      <BarLoader />
    </VStack>
      
  </Center>;
}

export default Loading;
