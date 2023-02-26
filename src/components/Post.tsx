import { sb } from '../supabase'
import { PostI } from '../types'

const Post = ({
  posts,
  setPosts,
  post,
  setPost,
}: {
  posts: PostI[]
  setPosts: React.Dispatch<React.SetStateAction<PostI[] | null>>
  post: PostI
  setPost: React.Dispatch<React.SetStateAction<PostI | undefined>>
}) => {
  const editPost = (id: number) => {
    setPost(posts?.find((post: PostI) => post.id === id))
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
