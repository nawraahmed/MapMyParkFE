import React from 'react'
import axios from 'axios'
import '../App.css'

const TicketItem = ({ ticket, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/tickets/${ticket._id}`)
      onDelete(ticket._id) // Call onDelete to remove the ticket from the list
    } catch (err) {
      console.log('Error deleting ticket:', err)
    }
  }

  return (
    <div>
      <p>
        {ticket.holderName} - {ticket.ticketType} (Issued on{' '}
        {new Date(ticket.issueDate).toLocaleDateString()})
        <button onClick={handleDelete}>Delete</button>
      </p>
    </div>
  )
}

export default TicketItem
