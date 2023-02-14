import { useEffect, useState } from 'react'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { sb } from './supabase'

const App = () => {
  type Post = {
    id: number | undefined
    title: string
    content: string
  }

  const [posts, setPosts] = useState<Post[] | null>([])

  const defaultPost = { id: undefined, title: '', content: '' }
  const [post, setPost] = useState<Post>(defaultPost)

  useEffect(() => {
    const getPosts = async () => {
      const { data, error }: PostgrestSingleResponse<Post[]> = await sb.from('posts').select()
      if (error) {
        console.error(error)
        return
      }
      setPosts(data)
    }
    getPosts()
  }, [])

  const createPost = async () => {
    const { data, error } = await sb
      .from('posts')
      .upsert([{ ...post }])
      .select()
      .single()
    if (error) {
      console.error(error)
      return
    }
    const exists = posts?.find((post: Post) => post.id === data.id)
    if (exists) {
      const newPosts = [...(posts as Post[])]
      const i = posts?.findIndex((post: Post) => post.id === exists.id) as number
      newPosts[i] = data
      setPosts(newPosts)
    } else {
      setPosts([...(posts as Post[]), data])
    }
    setPost(defaultPost)
  }

  const editPost = (id: number) => {
    const toEdit = posts?.find((post: Post) => post.id === id) as Post
    setPost(toEdit)
  }

  const deletePost = async (id: number) => {
    await sb.from('posts').delete().eq('id', id)
    const newPosts = [...(posts as Post[])]
    const i = posts?.findIndex((post: Post) => post.id === id) as number
    newPosts.splice(i, 1)
    setPosts(newPosts)
  }

  return (
    <div>
      <input
        type='text'
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <input
        type='text'
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      <button onClick={createPost}>Add</button>
      {posts?.map((post: any) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <button onClick={() => editPost(post.id)}>Edit</button>
          <button onClick={() => deletePost(post.id)}>Delete</button>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export default App
