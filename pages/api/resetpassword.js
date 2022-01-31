// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken';
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  query,
  where,
  getDocs
} from '@firebase/firestore';
import {
  db
} from '../../services/firebase';


const key = process.env.UNIQUE_KEY

export default async function (req, res) {
  if (!req.body) {
    res.statusCode = 404;
    res.end('Error')
    return
  }

  const { id, password } = req.body;
  console.log(id,password)

  const findUser = await getDocs(query(collection(db, 'members'), where('id', '==', id)))


  try {
    const userInfo = findUser.docs[0].data()
    const docRef = doc(db, 'members', userInfo.id);
    await updateDoc(docRef, {
      password: jwt.sign(password, key)
    })

    res.send({
      success: 'Password Changed'
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
    res.send({
      message: 'Cannot find Id'
    })
  }

}
