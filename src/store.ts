import { create } from 'zustand'
import { StateI, UserI, PostI } from './types'

export const useStore = create((set) => ({
  user: {},
  defaultPost: { id: undefined, author: '', title: '', content: '' },
  post: { id: undefined, author: '', title: '', content: '' },
  posts: [],
  setUser: (user: UserI) => set((state: StateI) => ({ user: user })),
  setPost: (post: PostI) => set((state: StateI) => ({ post: post })),
  setPosts: (posts: PostI[]) => set((state: StateI) => ({ posts: posts })),
}))
