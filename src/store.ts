import { create } from 'zustand'
import { UserI, PostI } from './types'

export const useStore = create((set) => ({
  user: null,
  defaultPost: { id: undefined, author: '', title: '', content: '' },
  post: { id: undefined, author: '', title: '', content: '' },
  posts: [],
  setUser: (user: UserI) => set(() => ({ user: user })),
  setPost: (post: PostI) => set(() => ({ post: post })),
  setPosts: (posts: PostI[]) => set(() => ({ posts: posts })),
}))
