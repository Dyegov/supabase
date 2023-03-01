import { useStore } from '../store'
import { StateI, PostI } from '../types'
import AddPostForm from '../components/AddPostForm'
import Post from '../components/Post'

const Index = () => {
  const posts = useStore((state: StateI) => state.posts)

  return (
    <div>
      <AddPostForm />
      <div className='container'>
        {posts
          ?.sort((a: PostI, b: PostI) => (a.id ?? 0) - (b?.id ?? 0))
          ?.map((post: PostI) => (
            <Post key={post.id} post={post} />
          ))}
      </div>
    </div>
  )
}

export default Index
