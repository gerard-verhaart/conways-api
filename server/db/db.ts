import connection from './connection'
import { Post } from '../../common/post'

export function getAllPosts(db = connection): Promise<Post[]> {
  return db('posts').select('*', 'date_created AS dateCreated')
}

export function addPost(newPost: Post, db = connection): Promise<number[]> {
  return db('posts').insert(
    {
      title: newPost.title,
      text: newPost.text,
      date_created: Date.now(),
    },
    '*'
  )
}
