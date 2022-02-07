import { Center, Heading,Box,Text, Flex,Stack } from "@chakra-ui/react";
import Card from "../components/Card";


function donate() {
  return (
    <>
      <Center>
        <Box w='100%' height='35vh' bgPos='center' bgSize='cover' bgImage='https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'>
          <Center h='100%'>
              <Stack alignItems={'center'}>
                <Heading as='h1' color='white'>
                  Thank you for choosing to donate
                </Heading>
                <Text as='span' color='white'>
                
                </Text>
              </Stack>
            </Center>
        </Box>
      </Center>
       <Flex flexDirection={'row'} wrap={'wrap'}>
        <Card heading='Pay with QRCode' src='https://cdn.discordapp.com/attachments/903863587343314975/939847397465538580/081100187220000000091644147461134.jpg' />
         <Box h='60vh' borderRadius={10} p={3} boxShadow={'2xl'} m={10} minW='20rem'>
          <Heading w='100%' fontSize='2rem' textAlign={'center'}>UPI Payment Details</Heading>
          <Center h='25%'>
            <Text>
              <Stack>
                <Center>
                <b>Account Id:</b>
                </Center>
                <b>7337431470@hdfcbank</b>
              </Stack>
            </Text>
          </Center>
          <Center bgRepeat={'no-repeat'} bgPos='center' bgSize={'contain'} bgImage='https://arpitatulsyan.com/wp-content/uploads/2020/03/upi-logo-png-4.png' h='50%'>
          </Center>
        </Box>
         <Box minW='20rem' h='60vh' borderRadius={10} p={3} boxShadow={'2xl'} m={10} w='25vw'>
          <Heading w='100%' fontSize='2rem' textAlign={'center'}>Account Transfer</Heading>
          <Center h='80%'>
            <Text>
              <Stack>
                <Center>
                <b>Account Details:</b>
                </Center>
                <b>
                  Account Holder: SUDALA SWAPNA
                </b>
                <b>Account Number: 50100492241621</b>
                <b>IFSC: HDFC0000811</b>
                <b>Branch: RAMACHANDRAPURAM - TELANGANA</b>
                <b>Account Type: SAVING</b>
              </Stack>
            </Text>
          </Center>
        </Box>
      </Flex>
    </>
  )
}

export default donate;
