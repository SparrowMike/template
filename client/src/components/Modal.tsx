//? https://nainacodes.com/blog/create-an-accessible-and-reusable-react-modal
// above link for future modal improvements 

import ReactDOM from "react-dom"

interface Modal {
  open: boolean
  onClose: () => void
  data: Items
}

export interface Item {
  email: string
  password: string
  _id: string
}

interface Items extends Array<Item> {}

export default function Modal({ open, onClose, data }: Modal ) {
  if (!open) return null

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={onClose}></div>
      <div className='modal'>
        <button onClick={onClose}>close</button>
        {data && data.map((item, index) => {
          return (
            <h1 key={index} >{ index + 1 } - { item.email }</h1>
          )
        })}
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  )
}
