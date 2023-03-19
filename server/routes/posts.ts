import { Router } from 'express'
import { getAllPosts, addPost } from '../db/db'

const router = Router()

router.get('/', (req, res) => {
  getAllPosts()
    .then((posts) => {
      res.json(posts)
    })
    .catch((err: Error) => {
      res.status(500).send(err.message)
    })
})

router.post('/', (req, res) => {
  addPost(req.body)
    .then((addedPost) => {
      res.json(addedPost)
      console.log(addedPost)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

export default router
