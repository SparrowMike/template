export default function Home() {
  const callMe = () => {
    fetch('/api/user/allusers', { method: 'GET' })
        .then(data => data.json())
        .then(json => alert(JSON.stringify(json)))
  }

  return (
    <div className="App">
      <header className="btn-container">
          <button className="btn" onClick={callMe}>Call API</button>
      </header>
    </div>
  )
}
