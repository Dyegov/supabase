import { sb } from '../../supabase'
import './Login.scss'

const Login = () => {
  const login = async () => {
    await sb.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className='login'>
      <button onClick={login}>Login with Google</button>
    </div>
  )
}

export default Login
