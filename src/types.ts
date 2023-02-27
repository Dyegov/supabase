export type StateI = {
  user: UserI | null
  defaultPost: PostI
  post: PostI
  posts: PostI[]
  setUser: (user: UserI) => void
  setPost: (post: PostI) => void
  setPosts: (posts: PostI[]) => void
}

export type UserI = {
  id: string
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  picture: string
  provider_id: string
  sub: string
} | null

export type PostI = {
  id: number | undefined
  author: string
  title: string
  content: string
}
