// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken';
import {
  addDoc,
  collection,
  updateDoc,
  doc
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

  const { email, uniqueKey, password } = req.body;
  
  if (uniqueKey === key) {

    const docRef = await addDoc(collection(db, 'members'), {
      email: email,
      password: password
    })

    await updateDoc(doc(db, 'members', docRef.id), {
      id: docRef.id
    })

    const token = jwt.sign({
      email: email,
      id: docRef.id
    }, key)
    
    res.send({
      jwt_token: token
    })

  } else {
    res.statusCode = 404;
    res.end('Error')
    return
  }
}
