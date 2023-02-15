import { usePosts } from './hooks/usePosts'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Post from './components/Post'
import AddPostForm from './components/AddPostForm'

const App = () => {
  const { user, setUser, post, setPost, posts, setPosts, defaultPost } = usePosts()

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
