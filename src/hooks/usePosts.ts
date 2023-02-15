import { useEffect, useState } from 'react'
import { sb } from '../supabase'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { UserI, PostI } from '../types'

export const usePosts = () => {
  const [user, setUser] = useState<UserI | null>(null)
  const defaultPost: PostI = { id: undefined, author: '', title: '', content: '' }
  const [post, setPost] = useState<PostI>(defaultPost)
  const [posts, setPosts] = useState<PostI[] | null>([])

  useEffect(() => {
    const getSession = async () => {
      const returnedSession: any = await sb.auth.getSession()
      if (returnedSession?.data?.session) {
        setUser({
          ...(returnedSession?.data?.session?.user?.user_metadata as UserI),
          id: returnedSession?.data?.session?.user?.id,
        })

        const { data, error }: PostgrestSingleResponse<PostI[]> = await sb
          .from('posts')
          .select()
          .eq('author', returnedSession?.data?.session?.user?.id)

        if (error) {
          console.error(error)
          return
        }
        setPosts(data)
      }
    }
    getSession()
  }, [])

  return { user, setUser, post, setPost, posts, setPosts, defaultPost }
}
