import { Router } from 'express'
import { getAllPosts } from '../db/db'

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

export default router
