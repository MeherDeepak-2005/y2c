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

  const { email, password } = req.body;

  const findUser = await getDocs(query(collection(db, 'members'), where('email', '==', email)))


  try {
    const userInfo = findUser.docs[0].data()

    if (userInfo.password !== password) {
      res.send({
        message: 'Wrong password'
      })
    } else {

      const token = jwt.sign({
        email: userInfo.email,
        id: userInfo.id
      }, key)

      res.send({
        image: userInfo.image,
        jwt_token: token
      })
    }
  } catch (err) {
    console.log(err)
    res.send({
      message: 'Invalid Email or password'
    })
  }

}
