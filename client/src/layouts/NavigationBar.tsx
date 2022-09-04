import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function NavigationBar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className='navigation'>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="doers">
        <button>Doers</button>
      </Link>
      {user && (
        <div style={{display: 'inline-block'}}>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
      {!user && (
        <>
          <Link to="login">
            <button>Login</button>
          </Link>
          <Link to="signup">
            <button>Signup</button>
          </Link>
        </>
      )}
    </nav>
  )
}
