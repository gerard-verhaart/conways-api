import connection from './connection'
import { Post } from '../../common/post'

export function getAllPosts(db = connection): Promise<Post[]> {
  return db('posts').select('*', 'date_created AS dateCreated')
}
