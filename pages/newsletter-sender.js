import React, { useState, useCallback, useEffect } from 'react'
import { Input, FormLabel, Box, Text, Button, HStack, Center, Divider, Textarea, Heading, VStack } from '@chakra-ui/react';
import { addDoc, updateDoc, collection, serverTimestamp, getDocs } from '@firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { db, storage } from '../services/firebase';
import { useDropzone } from 'react-dropzone';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';


function newsletterSender() {


  const [subject, setSubject] = useState('');

  const [MailText, setMailText] = useState('');

  const [imageUpload, setImageUpload] = useState(false);

  const [pdfFiles, setPdfFile] = useState([]);

  const [mailingList, setMailingList] = useState([]);



  let downloadUrl;

  const getSubscriberList = async () => {
    const subscriberList = await getDocs(collection(db, 'newsletter_experiment'));
    subscriberList.docs.map(
      email => mailingList.push(email.data().email)
    )
    console.log(mailingList);
  }

  useEffect(() => { getSubscriberList() }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `newsletters/${acceptedFiles[0].name}`);
    await uploadBytesResumable(imageRef, acceptedFiles[0]).then(
      async snapshot => {
        downloadUrl = await getDownloadURL(imageRef);
      }
    )
    const res = await fetch('/api/mailSender', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject: subject,
        body: MailText,
        downloadUrl: downloadUrl,
        fileName: acceptedFiles[0].name,
        mailingList: mailingList
      })
    }).then((res) => res.json);
    console.log(res);
  }
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles } =
    useDropzone({ accept: "application/pdf", noClick: true, noKeyboard: true, onDropAccepted: () => { setImageUpload(true) } });


  {/* <Text>
                    {Array.from(image.name).splice(0,10)}.{extension}
                  </Text> */}

  return (
    <>
      <form onSubmit={() => alert("Submitted")}>
        <Center flexWrap={'wrap'} justifyContent={'space-evenly'} p='10' bg='gray.100'>
          <Box minWidth={'fit-content'} border='dashed' borderWidth={'thick'} borderColor={isDragActive ? "green.500" : "gray.300"} p='10' bg='gray.100' h='fit-content' w='30vw' borderRadius='xl'>
            <div {...getRootProps()}>
              <input {...getInputProps()}>
              </input>
              {
                isDragActive ?
                  <Center flexDirection={'column'}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M12.5 40Q8.2 40 5.1 36.9Q2 33.8 2 29.5Q2 25.6 4.475 22.625Q6.95 19.65 10.85 19.05Q11.85 14.2 15.55 11.125Q19.25 8.05 24.1 8.05Q29.75 8.05 33.575 12.125Q37.4 16.2 37.4 21.9V23.1Q41 23 43.5 25.425Q46 27.85 46 31.55Q46 35 43.5 37.5Q41 40 37.55 40H25.5Q24.3 40 23.4 39.1Q22.5 38.2 22.5 37V24.1L18.35 28.25L16.2 26.1L24 18.3L31.8 26.1L29.65 28.25L25.5 24.1V37Q25.5 37 25.5 37Q25.5 37 25.5 37H37.55Q39.8 37 41.4 35.4Q43 33.8 43 31.55Q43 29.3 41.4 27.7Q39.8 26.1 37.55 26.1H34.4V21.9Q34.4 17.45 31.375 14.25Q28.35 11.05 23.9 11.05Q19.45 11.05 16.4 14.25Q13.35 17.45 13.35 21.9H12.4Q9.3 21.9 7.15 24.075Q5 26.25 5 29.45Q5 32.55 7.2 34.775Q9.4 37 12.5 37H19.5V40ZM24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Z" /></svg>
                    <Text fontWeight='bold'>
                      Drop files here
                    </Text>
                    {/* <HStack m='3'>
                      <Divider h='0.5' style={{ backgroundColor: "black", color: "black" }} w='40'></Divider>
                      <Text>
                        OR
                      </Text>
                      <Divider h='0.5' style={{ backgroundColor: "black", color: "black" }} />
                    </HStack>
                    <Button bg='blue.400'>
                      <Input accept='application/pdf' onChange={handlePdfUpload} hidden type={'file'} id='browse_files' />
                      <FormLabel cursor={'pointer'} accept='application/pdf' onChange={handlePdfUpload} htmlFor='browse_files' p='0' m='0' textAlign={'center'}>
                        Browse Files
                      </FormLabel>
                    </Button> */}
                  </Center>
                  : <Center flexDirection={'column'}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M12.5 40Q8.2 40 5.1 36.9Q2 33.8 2 29.5Q2 25.6 4.475 22.625Q6.95 19.65 10.85 19.05Q11.85 14.2 15.55 11.125Q19.25 8.05 24.1 8.05Q29.75 8.05 33.575 12.125Q37.4 16.2 37.4 21.9V23.1Q41 23 43.5 25.425Q46 27.85 46 31.55Q46 35 43.5 37.5Q41 40 37.55 40H25.5Q24.3 40 23.4 39.1Q22.5 38.2 22.5 37V24.1L18.35 28.25L16.2 26.1L24 18.3L31.8 26.1L29.65 28.25L25.5 24.1V37Q25.5 37 25.5 37Q25.5 37 25.5 37H37.55Q39.8 37 41.4 35.4Q43 33.8 43 31.55Q43 29.3 41.4 27.7Q39.8 26.1 37.55 26.1H34.4V21.9Q34.4 17.45 31.375 14.25Q28.35 11.05 23.9 11.05Q19.45 11.05 16.4 14.25Q13.35 17.45 13.35 21.9H12.4Q9.3 21.9 7.15 24.075Q5 26.25 5 29.45Q5 32.55 7.2 34.775Q9.4 37 12.5 37H19.5V40ZM24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Q24 25.5 24 25.5Z" /></svg>
                    <Text fontWeight='bold'>
                      {imageUpload ? "Uploaded pdf document" : "Drag and drop files here"}
                    </Text>
                    {/* {
                      (!imageUpload) ? <> <HStack m='3'>
                        <Divider h='0.5' style={{ backgroundColor: "black", color: "black" }} w='40'></Divider>
                        <Text>
                          OR
                        </Text>
                        <Divider h='0.5' style={{ backgroundColor: "black", color: "black" }} />
                      </HStack>
                        <Button bg='blue.400'>
                          <Input onChange={(e) => { pdfFile = e.target.files[0] }} hidden type={'file'} id='browse_files' />
                          <FormLabel htmlFor='browse_files' p='0' m='0' textAlign={'center'}>
                            Browse Files
                          </FormLabel>
                        </Button>
                      </> : <>
                        <HStack m='3'>
                          <Divider h='0.5' style={{ backgroundColor: "black", color: "black" }} w='40'></Divider>
                          <Text>
                            OR
                          </Text>
                          <Divider h='0.5' style={{ backgroundColor: "black", color: "black" }} />
                        </HStack>
                        <Button bg='blue.400'>
                          <Input onChange={(e) => { pdfFile = e.target.files[0] }} hidden type={'file'} id='browse_files' />
                          <FormLabel htmlFor='browse_files' p='0' m='0' textAlign={'center'}>
                            Change File
                          </FormLabel>
                        </Button>
                      </>
                    } */}
                  </Center>
              }
            </div>
          </Box>
          <Box mt={['10', '10', '0']}>
            <VStack spacing='5'>
              <Heading as='h1' fontSize='100%'>
                Additional Details
              </Heading>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Subject</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value) }}
                  label="Name"
                />
                <br />
                <VStack spacing='3'>
                  <Textarea _focus={{ outline: 'none' }} value={MailText} placeholder='Brief description of the newsletter' onChange={(e) => { setMailText(e.target.value) }} />
                  <Button onClick={handleSubmit} _focus={{ outline: 'none' }} varaint='solid' colorScheme={'telegram'}>
                    Send Mail
                  </Button>
                </VStack>
              </FormControl>
            </VStack>
          </Box>
        </Center>
      </form>
    </>

  )
}

export default newsletterSender