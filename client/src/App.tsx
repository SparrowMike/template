import { useState } from 'react'
import './../css/style.css'

function App() {

  const callMe = () => {
    fetch('http://localhost:5000/api/data', { method: 'GET' })
        .then(data => data.json())
        .then(json => alert(JSON.stringify(json)))
  }
  return (
    <div className="App">
       <header className="btn-container">
          <button onClick={callMe}>Call API</button>
        </header>
    </div>
  )
}

export default App
