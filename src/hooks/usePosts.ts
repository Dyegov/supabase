import { useEffect } from 'react'
import { sb } from '../supabase'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { StateI, PostI } from '../types'
import { useStore } from '../store'

export const usePosts = () => {
  const setUser = useStore((state: StateI) => state.setUser)
  const setPosts = useStore((state: StateI) => state.setPosts)

  useEffect(() => {
    const getSession = async () => {
      const returnedSession = await sb.auth.getSession()
      if (returnedSession?.data?.session) {
        setUser({
          id: returnedSession?.data?.session?.user?.id,
          avatar_url: returnedSession?.data?.session?.user?.user_metadata?.avatar_url,
          email: returnedSession?.data?.session?.user?.user_metadata?.email,
          email_verified: returnedSession?.data?.session?.user?.user_metadata?.email_verified,
          full_name: returnedSession?.data?.session?.user?.user_metadata?.full_name,
          iss: returnedSession?.data?.session?.user?.user_metadata?.iss,
          name: returnedSession?.data?.session?.user?.user_metadata?.name,
          picture: returnedSession?.data?.session?.user?.user_metadata?.picture,
          provider_id: returnedSession?.data?.session?.user?.user_metadata?.provider_id,
          sub: returnedSession?.data?.session?.user?.user_metadata?.sub,
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

  return
}
