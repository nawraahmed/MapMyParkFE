import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TicketForm from './TicketForm'
import Header from './Header'
import Footer from './Footer'

const TicketList = () => {
  const [tickets, setTickets] = useState([])

  const fetchTickets = async () => {
    const token = localStorage.getItem('token') // Get JWT from local storage
    try {
      const response = await axios.get('http://localhost:4000/api/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTickets(response.data)
    } catch (error) {
      console.error('Error fetching tickets:', error)
      // Handle error
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const handleDelete = async (ticketId) => {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`http://localhost:4000/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      )
    } catch (error) {
      console.error('Error deleting ticket:', error)
      // Handle error
    }
  }

  return (
    <div>
      <div className="tickets-content">
        <h1>Your Tickets</h1>
        <TicketForm
          onCreate={(newTicket) => setTickets([...tickets, newTicket])}
        />
        <ul className="tickets-list">
          {tickets.map((ticket) => (
            <li key={ticket._id}>
              {ticket.holderName} - {ticket.ticketType} (Issued on{' '}
              {new Date(ticket.issueDate).toLocaleDateString()})
              <button className="btn" onClick={() => handleDelete(ticket._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TicketList
