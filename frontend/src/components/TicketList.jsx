import React, { useEffect, useState } from 'react'
import axios from 'axios' // Ensure axios is imported
import ticketApi from '../api/ticketApi' // Ensure the path to ticketApi is correct
import TicketForm from './TicketForm'
import '../App.css'

const TicketList = ({ onDelete, userId }) => {
  // Add userId as a prop
  const [tickets, setTickets] = useState([])

  // Fetch tickets from the server
  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/tickets')
      setTickets(response.data) // Set the fetched tickets to state
    } catch (error) {
      console.error('Error fetching tickets:', error)
    }
  }

  // UseEffect to fetch tickets when the component mounts
  useEffect(() => {
    fetchTickets()
  }, [])

  // Handle the creation of a new ticket
  const handleCreate = (newTicket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]) // Add the new ticket to the list
  }

  // Handle the deletion of a ticket
  const handleDelete = async (id) => {
    try {
      await ticketApi.deleteTicket(id) // Call the delete API
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      ) // Remove the deleted ticket from the state
      onDelete() // Call the onDelete prop
    } catch (error) {
      console.error('Error deleting ticket:', error)
    }
  }

  // Filter tickets for the specific user
  const userTickets = tickets.filter((ticket) => ticket.userId === userId)

  return (
    <div>
      <h1>Your Tickets</h1>
      <TicketForm onCreate={handleCreate} /> {/* Render the TicketForm */}
      <ul>
        {userTickets.map((ticket) => (
          <li key={ticket._id}>
            {ticket.holderName} - {ticket.ticketType} (Issued on:{' '}
            {new Date(ticket.issueDate).toLocaleDateString()})
            <button onClick={() => handleDelete(ticket._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TicketList
