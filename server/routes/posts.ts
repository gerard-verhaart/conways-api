import { Router } from 'express'
import { getAllPosts, addPost, updatePost, deletePost } from '../db/db'

const router = Router()

router.get('/', (req, res) => {
  getAllPosts()
    .then((posts) => {
      res.json(posts)
    })
    .catch((err: Error) => res.status(500).send(err.message))
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

router.patch('/:id', (req, res) => {
  updatePost(Number(req.params.id), req.body)
    .then((returned) => {
      res.json(returned[0])
    })
    .catch((err: Error) => {
      res.status(500).send(err.message)
    })
})

router.delete('/:id', (req, res) => {
  deletePost(Number(req.params.id))
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err: Error) => res.status(500).send(err.message))
})

export default router
