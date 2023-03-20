import express from 'express'

// eslint-disable-next-line no-unused-vars
import { updateComment, deleteComment } from '../db/db'

const router = express.Router()

router.patch('/:commentId', (req, res) => {
  updateComment(Number(req.params.commentId), req.body)
    .then(([returned]) => {
      res.json(returned)
    })
    .catch((err: Error) => {
      res.status(500).send(err.message)
    })
})

router.delete('/:commentId', (req, res) => {
  deleteComment(Number(req.params.commentId))
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err: Error) => res.status(500).send(err.message))
})

export default router
