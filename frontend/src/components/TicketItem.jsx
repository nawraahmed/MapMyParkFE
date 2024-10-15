// src/components/TicketItem.js
import React from 'react'
import axios from 'axios'
import '../App.css'
import TicketList from './TicketList'

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
      <TicketList onDelete={handleDelete} />
    </div>
  )
}

export default TicketItem
