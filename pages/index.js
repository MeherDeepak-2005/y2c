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
        <meta name='description' content='In Y2C, we believe that no matter how little you do for someone, it will always have a greater yield. Our vision is to help impact the lives of the children in the childcare institutions who may be orphans or abandoned by their parents etc. to realise their potential and feel that they are all they need to become successful.We want to empower them by making them understand the true power of education so that they can dream big and subsequently achieve their passion whether it be in academics or niche areas like music, dance and art.Therefore, a little support from you all will help us a lot in the long run as this is a long term project for us and not a one time thing. For now, we have started working in Guwahati (in Assam) and Hyderabad (in Telangana) but we plan to expand in the future. Why did we come up with this project? The answer to this lies in the fact that even though the children in the childcare institutions are taken care off, they still feel empty and lonely at times and blame their situation on their destiny. We want to change that. We want to make them believe that they have the power to change their destiny and education is one of the most powerful ways to do that. We want to make them feel that they are enough for themselves and that they can go on to have their own families in the future instead of waiting to get adopted. We want them to have big dreams and aspiration and work towards it with their full determination.'/>
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
