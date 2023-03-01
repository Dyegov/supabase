import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useStore } from './store'
import { usePosts } from './hooks/usePosts'
import { StateI } from './types'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Index from './pages/Index'

const App = () => {
  // Get data from DB
  usePosts()

  const user = useStore((state: StateI) => state.user)

  return (
    <div>
      {user ? (
        <>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index element={<Index />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
