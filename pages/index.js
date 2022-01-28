import { Box,HStack, VStack, Text, Heading, Image } from '@chakra-ui/react';
import Starter from '../components/starter';
import NavBar from '../components/navbar';
import Header from '../components/header';
import Midtower from '../components/midtower';
import Head from 'next/head'
import Project from '../components/project';
import Contact from '../components/contact';


export default function Home({ userInfo }) {
  return (
    <>
      <Head>
        <title>Project Y2C</title>
      </Head>
      <NavBar/>
      <Header></Header>
      <Midtower></Midtower>
      <Project></Project>
      <Contact></Contact>
    </>
  )
}
