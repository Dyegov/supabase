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
  setPost: React.Dispatch<React.SetStateAction<PostI>>
}) => {
  const editPost = (id: number) => {
    const toEdit = posts?.find((post: PostI) => post.id === id) as PostI
    setPost(toEdit)
  }

  const deletePost = async (id: number) => {
    await sb.from('posts').delete().eq('id', id)
    const newPosts = [...(posts as PostI[])]
    const i = posts?.findIndex((post: PostI) => post.id === id) as number
    newPosts.splice(i, 1)
    setPosts(newPosts)
  }

  return (
    <div key={post.id} className='mb-4'>
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
