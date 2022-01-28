// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken';
import {
  addDoc,
  collection,
  query,
  where
} from '@firebase/firestore';
import jwt from 'jsonwebtoken';
import {
  db
} from "../../services/firebase";
const key = process.env.UNIQUE_KEY

export default function (req, res) {
  if (!req.cookies) {
    res.statusCode = 404;
    res.end('Error')
    return
  }
  else {
    const { email, password } = req.body;
    const user = getDoc(query(collection(db, 'members'), where('email', '==', email)))

    if (user) {
      req.cookies = jwt.sign({
        email: user.email,
        id: user.id
      },key)
      res.json(user)
    } else {
      res.statusCode = 404;
      res.end('Error')
      return
    }
  }
}
