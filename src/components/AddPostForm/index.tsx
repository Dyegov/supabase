import { useStore } from '../../store'
import { sb } from '../../supabase'
import { StateI, PostI } from '../../types'
import './AddPostForm.scss'

const AddPostForm = () => {
  const user = useStore((state: StateI) => state.user)
  const defaultPost = useStore((state: StateI) => state.defaultPost)
  const post = useStore((state: StateI) => state.post)
  const setPost = useStore((state: StateI) => state.setPost)
  const posts = useStore((state: StateI) => state.posts)
  const setPosts = useStore((state: StateI) => state.setPosts)

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await sb
      .from('posts')
      .upsert([{ ...post, author: user?.id }])
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
    <div className='container add-form'>
      <form onSubmit={createPost}>
        <div className='input-group'>
          <label>Title</label>
          <input
            type='text'
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div className='input-group'>
          <label>Post</label>
          <textarea
            rows={4}
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
          />
        </div>
        <div className='buttons'>
          <input type='submit' value={post.id ? 'Edit' : 'Add'} />
        </div>
      </form>
    </div>
  )
}

export default AddPostForm
