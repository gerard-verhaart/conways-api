export interface Post {
  id?: number
  title: string
  text: string
  dateCreated?: number
}

export interface Routeposts extends Post {
  date_created?: number
}
