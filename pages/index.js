import { Box,HStack, VStack, Text, Heading, Image } from '@chakra-ui/react';
import Starter from '../components/starter';
import NavBar from '../components/navbar';
import Header from '../components/header';
import Vision from '../components/Vision';
import Head from 'next/head'
import Project from '../components/project';
import Contact from '../components/contact';
import { getDocs,collection } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function Home({ visionsLinks, projectUpdatesLinks }) {
  const visionLinks = JSON.parse(visionsLinks);
  const projectUpdateLinks = JSON.parse(projectUpdatesLinks);
  return (
    <>
      <Head>
        <title>Project Y2C</title>
        <link rel="icon" href="/Logo.png" />
        <meta name="google-site-verification" content="gW6Xc80JgsNeLjSZ-ihmv69vY0N5Vcp_f4kVu0hCHmw" />
      </Head>
      <NavBar />
      <Header></Header>
      <Vision links={visionLinks}></Vision>
      <Project links={projectUpdateLinks}></Project>
      <Contact></Contact>
    </>
  )
}


export async function getServerSideProps() {
  const projectUpdates = []
  const visions = []
  const resProjects = await getDocs(collection(db, 'project_updates'))
  resProjects.forEach(doc => projectUpdates.push(doc.data()))
  const resVision = await getDocs(collection(db, 'visions'))
  resVision.forEach(doc => visions.push(doc.data()))

  return {
    props: {
      projectUpdatesLinks: JSON.stringify(projectUpdates),
      visionsLinks: JSON.stringify(visions)
    }
  }
}
