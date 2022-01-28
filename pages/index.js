import { Box,HStack, VStack, Text, Heading, Image } from '@chakra-ui/react';
import Starter from '../components/starter';
import NavBar from '../components/navbar';
import Header from '../components/header';
import Midtower from '../components/midtower';
import Head from 'next/head'
import Project from '../components/project';
import Contact from '../components/contact';
import { useEffect,useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import ParseCookies from '../services/parseCookies';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'


export default function Home() {


  useEffect(() => {
    const token = Cookies.get('token')
    const userInfo = jwt.decode(token)
    try {
      onSnapshot(query(collection(db, 'members'), where('email', '==', userInfo.email)), snapshot => {
        const data = snapshot.docs[0];

        localStorage.setItem('image', data.data().image)
      })
    } catch (err) {
      console.log(err)
    }
  }, []);

  return (
    <>
      <Head>
        <title>Project Y2C</title>
      </Head>
      <NavBar />
      <Header></Header>
      <Midtower></Midtower>
      <Project></Project>
      <Contact></Contact>
    </>
  )
}
