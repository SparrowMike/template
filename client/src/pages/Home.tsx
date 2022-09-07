import { useAuthContext } from "../hooks/useAuthContext"

export default function Home() {
  const { user } = useAuthContext();

  const callMe = async () => {
    console.log(user)
    if (user) {
      const response = await fetch('/api/user/allusers', { 
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${user.token}`
        } 
      })

      const json = await response.json()
      alert(JSON.stringify(json))
    }
  }

  return (
    <div className="App">
      <header className="btn-container">
          <button className="btn" onClick={callMe}>Call API</button>
      </header>
    </div>
  )
}
