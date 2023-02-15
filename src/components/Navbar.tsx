import { sb } from '../supabase'
import { UserI } from '../types'

const Navbar = ({
  user,
  setUser,
}: {
  user: UserI
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>
}) => {
  const logout = async () => {
    await sb.auth.signOut()
    setUser(null)
  }

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <a className='navbar-brand text-success' href='#'>
          Supabase
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='#'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Link
              </a>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Dropdown
              </a>
              <ul className='dropdown-menu'>
                <li>
                  <a className='dropdown-item' href='#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <a className='nav-link disabled'>Disabled</a>
            </li>
          </ul>
          <div>
            <img src={user.picture} alt='' className='profile-picture' />
            <span className='fw-bold'>{user.full_name}</span>
            <button className='btn btn-secondary ms-3' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
