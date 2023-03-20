import { Router } from 'express'
import {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
  getCommentsOnPost,
  addComment,
} from '../db/db'
import { Routeposts } from '../../common/post'

const router = Router()

router.get('/', (req, res) => {
  getAllPosts()
    .then((posts) => {
      posts.forEach((post) => {
        delete post.date_created
      })
      res.json(posts)
    })
    .catch((err: Error) => res.status(500).send(err.message))
})

router.post('/', (req, res) => {
  addPost(req.body)
    .then(([addedPost]) => {
      res.json(addedPost)
      // res.redirect(`/${addedPost.id}`)
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

router.get('/:postId/comments', (req, res) => {
  getCommentsOnPost(Number(req.params.postId))
    .then((comments) => {
      res.json(comments)
    })
    .catch((err: Error) => res.status(500).send(err.message))
})

router.post('/:postId/comments', (req, res) => {
  addComment(Number(req.params.postId), req.body)
    .then(([addedComment]) => {
      res.json(addedComment)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

export default router
