import './App.css'
import React, { useState } from 'react'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'

const App = () => {
  const [ticketsUpdated, setTicketsUpdated] = useState(false)

  const [tickets, setTickets] = useState([])

  const handleCreate = (newTicket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket])
  }
  const handleDelete = () => {
    setTicketsUpdated((prev) => !prev)
  }

  return (
    <div>
      <TicketList onDelete={handleDelete} />
    </div>
  )
}

export default App
