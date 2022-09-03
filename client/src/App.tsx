import { useState } from 'react'


function App() {

  const callMe = () => {
    fetch('http://localhost:5000/api/user/allusers', { method: 'GET' })
        .then(data => data.json())
        .then(json => alert(JSON.stringify(json)))
  }
  
  // lets delete this App, extract the api to services and have the button as a component 

  return (
    <div className="App">
       <header className="btn-container">
          <button className="btn" onClick={callMe}>Call API</button>
        </header>
    </div>
  )
}

export default App
