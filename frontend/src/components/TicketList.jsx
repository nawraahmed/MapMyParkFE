import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TicketForm from './TicketForm'

const TicketList = () => {
  const [tickets, setTickets] = useState([])

  const fetchTickets = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:4000/api/tickets', {
        headers: { Authorization: `Bearer ${token}` } // Ensure the token is passed correctly
      })
      setTickets(response.data)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const handleDelete = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:4000/api/tickets/${ticketId}`)
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      ) // Remove deleted ticket from state
    } catch (error) {
      console.error('Error deleting ticket:', error)
    }
  }

  return (
    <div>
      <h1>Your Tickets</h1>
      <TicketForm
        onCreate={(newTicket) =>
          setTickets((prevTickets) => [...prevTickets, newTicket])
        }
      />
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            {ticket.holderName} - {ticket.ticketType} (Issued on{' '}
            {new Date(ticket.issueDate).toLocaleDateString()})
            <button onClick={() => handleDelete(ticket._id)}>Delete</button>{' '}
            {/* Added delete button */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TicketList
