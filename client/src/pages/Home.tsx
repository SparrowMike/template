import { useState } from "react";
import Modal from '../components/Modal'
import { useAuthContext } from "../hooks/useAuthContext"
import { Item } from "../components/Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState(Array<Item>)

  const { user } = useAuthContext();

  const callMe = async () => {
    if (user) {
      setIsOpen(true)
      const response = await fetch('/api/user/allusers', { 
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${user.token}`
        } 
      })

      const json = await response.json()
      setData(json)
    }
  }
  console.log('----------------------------------', user)

  return (
    <div className="App">
      {!user && 
        <header className="btn-container">
            <button className='btn'  onClick={callMe}>Modal</button>
            <Modal data={data} open={isOpen} onClose={() => setIsOpen(false)} />
        </header>
      }
    </div>
  )
}
