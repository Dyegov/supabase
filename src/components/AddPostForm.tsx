import { usePosts } from '../hooks/usePosts'
import { sb } from '../supabase'
import { PostI } from '../types'

const AddPostForm = ({ userId }: { userId: string }) => {
  const { post, setPost, posts, setPosts, defaultPost } = usePosts()

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await sb
      .from('posts')
      .upsert([{ ...post, author: userId }])
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
        <input
          className='btn btn-primary w-25 m-auto'
          type='submit'
          value={post.id ? 'Edit' : 'Add'}
        />
      </form>
    </div>
  )
}

export default AddPostForm
