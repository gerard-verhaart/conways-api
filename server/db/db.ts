import connection from './connection'
import { Post, Routeposts } from '../../common/post'

export function getAllPosts(db = connection): Promise<Routeposts[]> {
  return db('posts').select('*', 'date_created AS dateCreated')
}

export function addPost(newPost: Post, db = connection): Promise<Post[]> {
  return db('posts').insert(
    {
      ...newPost,
      date_created: Date.now(),
    },
    '*'
  )
}

export function updatePost(
  id: number,
  updatedPost: Post,
  db = connection
): Promise<Post[]> {
  return db('posts')
    .update({ ...updatedPost }, [
      'id',
      'title',
      'date_created AS dateCreated',
      'text',
    ])
    .where('id', id)
}

export function deletePost(id: number, db = connection): Promise<number> {
  return db('comments')
    .del()
    .where('post_id', id)
    .then(() => {
      return db('posts').del().where('id', id)
    })
}

export function getCommentsOnPost(
  postId: number,
  db = connection
): Promise<Comment[]> {
  return db('comments')
    .select('id', 'post_id AS postId', 'date_posted AS datePosted', 'comment')
    .where('post_id', postId)
}

export function addComment(
  postId: number,
  addedComment: Comment,
  db = connection
): Promise<Comment[]> {
  return db('comments')
    .insert({ ...addedComment, post_id: postId, date_posted: Date.now() }, '*')
    .where('post_id', postId)
}

export function updateComment(
  id: number,
  updatedComment: Comment,
  db = connection
): Promise<Comment[]> {
  return db('comments')
    .update({ ...updatedComment }, [
      'id',
      'post_id AS postId',
      'date_posted AS datePosted',
      'comment',
    ])
    .where('id', id)
}

export function deleteComment(id: number, db = connection): Promise<number> {
  return db('comments').del().where('id', id)
}
