// src/components/TicketItem.js
import React from 'react'
import axios from 'axios'
import '../App.css'

const TicketItem = ({ ticket }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tickets/${ticket._id}`)
      window.location.reload() // Reload the page after deletion
    } catch (err) {
      console.log('Error deleting ticket:', err)
    }
  }

  return (
    <div>
      <h3>{ticket.holderName}</h3>
      <p>Ticket Type: {ticket.ticketType}</p>
      <p>Issue Date: {new Date(ticket.issueDate).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete Ticket</button>
    </div>
  )
}

export default TicketItem
