import { useStore } from './store'
import { usePosts } from './hooks/usePosts'
import { StateI, PostI } from './types'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Post from './components/Post'
import AddPostForm from './components/AddPostForm'

const App = () => {
  // Get data from DB
  usePosts()

  const user = useStore((state: StateI) => state.user)
  const posts = useStore((state: StateI) => state.posts)

  return (
    <div>
      {user ? (
        <>
          <Navbar />

          <AddPostForm />

          <div className='container'>
            {posts
              ?.sort((a: PostI, b: PostI) => (a.id ?? 0) - (b?.id ?? 0))
              ?.map((post: PostI) => (
                <Post key={post.id} post={post} />
              ))}
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
