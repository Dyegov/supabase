import { useEffect, useState } from 'react'
import { sb } from '../supabase'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { StateI, UserI, PostI } from '../types'
import { useStore } from '../store'

export const usePosts = () => {
  const setUser = useStore((state: any) => state.setUser)
  const setPosts = useStore((state: any) => state.setPosts)

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

  return
}
