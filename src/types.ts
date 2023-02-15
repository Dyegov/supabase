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
}

export type PostI = {
  id: number | undefined
  author: string
  title: string
  content: string
}
