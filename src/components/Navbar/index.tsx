import { useStore } from '../../store'
import { sb } from '../../supabase'
import { StateI } from '../../types'
import './Navbar.scss'

const Navbar = () => {
  const user = useStore((state: StateI) => state.user)
  const setUser = useStore((state: StateI) => state.setUser)

  const logout = async () => {
    await sb.auth.signOut()
    setUser(null)
  }

  return (
    <nav>
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/'>Posts</a>
        </li>
      </ul>
      <div className='nav__user'>
        <img
          src={user?.picture}
          alt=''
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = 'Profile_icon.png'
          }}
        />
        <span>{user?.full_name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
