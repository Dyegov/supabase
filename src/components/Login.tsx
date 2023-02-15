import { sb } from '../supabase'

const Login = () => {
  const login = async () => {
    await sb.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className='login'>
      <button className='btn btn-primary' onClick={login}>
        Login with Google
      </button>
    </div>
  )
}

export default Login
