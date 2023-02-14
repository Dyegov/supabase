import { useEffect, useState } from 'react'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { sb } from './supabase'
import { UserI, PostI } from './types'
import Navbar from './components/Navbar'
import Post from './components/Post'

const App = () => {
  const [user, setUser] = useState<UserI | null>(null)

  const login = async () => {
    await sb.auth.signInWithOAuth({ provider: 'google' })
  }

  useEffect(() => {
    const getSession = async () => {
      const returnedSession = await sb.auth.getSession()
      setUser(returnedSession?.data?.session?.user?.user_metadata as UserI)
    }
    getSession()
  }, [])

  const [posts, setPosts] = useState<PostI[] | null>([])
  const defaultPost: PostI = { id: NaN, title: '', content: '' }
  const [post, setPost] = useState<PostI>(defaultPost)

  useEffect(() => {
    const getPosts = async () => {
      const { data, error }: PostgrestSingleResponse<PostI[]> = await sb.from('posts').select()
      if (error) {
        console.error(error)
        return
      }
      setPosts(data)
    }
    getPosts()
  }, [])

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await sb
      .from('posts')
      .upsert([{ ...post }])
      .select()
      .single()
    if (error) {
      console.error(error)
      return
    }
    const exists = posts?.find((post: PostI) => post.id === data.id)
    if (exists) {
      const newPosts = [...(posts as PostI[])]
      const i = posts?.findIndex((post: PostI) => post.id === exists.id) as number
      newPosts[i] = data
      setPosts(newPosts)
    } else {
      setPosts([...(posts as PostI[]), data])
    }
    setPost(defaultPost)
  }

  return (
    <div>
      {user ? (
        <>
          <Navbar user={user} setUser={setUser} />
          <div className='container pt-4'>
            <form
              className='d-flex flex-column w-50 m-auto border border-dashed border-primary rounded p-4'
              onSubmit={createPost}
            >
              <div className='mb-3'>
                <label className='form-label text-primary'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='form-label text-primary'>Post</label>
                <textarea
                  className='form-control'
                  rows={4}
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  required
                />
              </div>
              <input className='btn btn-primary w-25 m-auto' type='submit' value='Add' />
            </form>
          </div>
          <div className='container mt-5'>
            {posts
              ?.sort((a: PostI, b: PostI) => a.id - b.id)
              ?.map((post: any) => (
                <Post posts={posts} setPosts={setPosts} post={post} setPost={setPost} />
              ))}
          </div>
        </>
      ) : (
        <div>
          <button onClick={login}>Login with Google</button>
        </div>
      )}
    </div>
  )
}

export default App
