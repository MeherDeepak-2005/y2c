import React from 'react';
import Vision from '../components/Vision';
import {
  getDocs,
  collection
} from '@firebase/firestore';
import { db } from '../services/firebase';

function visionPage({ visionsLinks }) {
  const links = JSON.parse(visionsLinks);
  return <Vision links={links}></Vision>;
}

export default visionPage;

export async function getServerSideProps() {
  const visions = []
  const resVision = await getDocs(collection(db, 'visions'))
  resVision.forEach(doc => visions.push(doc.data()))

  return {
    props: {
      visionsLinks: JSON.stringify(visions)
    }
  }
}
