import connection from './connection'
import { Post } from '../../common/post'

export function getAllPosts(db = connection): Promise<Post[]> {
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
