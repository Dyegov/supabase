import { useStore } from './store'
import { usePosts } from './hooks/usePosts'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Post from './components/Post'
import AddPostForm from './components/AddPostForm'

const App = () => {
  usePosts()

  const user = useStore((state: any) => state.user)
  const setUser = useStore((state: any) => state.setUser)
  const setPost = useStore((state: any) => state.setPost)
  const posts = useStore((state: any) => state.posts)
  const setPosts = useStore((state: any) => state.setPosts)

  return (
    <div>
      {user ? (
        <>
          <Navbar user={user} setUser={setUser} />

          <AddPostForm userId={user?.id} />

          <div className='container mt-5'>
            {posts
              ?.sort((a: any, b: any) => a.id - b.id)
              ?.map((post: any) => (
                <Post
                  key={post.id}
                  posts={posts}
                  setPosts={setPosts}
                  post={post}
                  setPost={setPost}
                />
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
