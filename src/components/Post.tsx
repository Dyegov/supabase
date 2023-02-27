import { useStore } from '../store'
import { sb } from '../supabase'
import { StateI, PostI } from '../types'

const Post = ({ post }: { post: PostI }) => {
  const setPost = useStore((state: StateI) => state.setPost)
  const posts = useStore((state: StateI) => state.posts)
  const setPosts = useStore((state: StateI) => state.setPosts)
  const defaultPost = useStore((state: StateI) => state.defaultPost)

  const editPost = (id: number) => {
    setPost(posts?.find((post: PostI) => post.id === id) ?? defaultPost)
  }

  const deletePost = async (id: number) => {
    await sb.from('posts').delete().eq('id', id)
    setPosts(posts.filter((post: PostI) => post.id !== id))
  }

  return (
    <div className='mb-4'>
      <div className='d-flex gap-4 align-items-center'>
        <h1>{post.title}</h1>
        <div className='d-flex gap-2'>
          <button className='btn btn-info text-white' onClick={() => editPost(Number(post.id))}>
            Edit
          </button>
          <button className='btn btn-danger' onClick={() => deletePost(Number(post.id))}>
            Delete
          </button>
        </div>
      </div>
      <p>{post.content}</p>
    </div>
  )
}

export default Post
