import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TicketForm from './TicketForm'

const TicketList = () => {
  const [tickets, setTickets] = useState([])

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:4000/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}` // Pass token in headers
        }
      })
      setTickets(response.data)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TicketList
