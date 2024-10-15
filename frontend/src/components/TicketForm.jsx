import React, { useState } from 'react'
import ticketApi from '../api/ticketApi'
import '../App.css'

const TicketForm = ({ onCreate }) => {
  const [holderName, setHolderName] = useState('')
  const [ticketType, setTicketType] = useState('Adult') // Default to "Adult"

  const createTicket = async (e) => {
    e.preventDefault() // Prevent form submission from refreshing the page

    try {
      const newTicket = {
        holderName,
        ticketType
        // The issueDate can be generated on the backend
      }

      const response = await ticketApi.createTicket(newTicket) // Create ticket API call
      onCreate(response.data) // Pass the new ticket back to TicketList
      setHolderName('') // Reset form field
      setTicketType('Adult') // Reset dropdown to default
    } catch (error) {
      console.error('Error creating ticket:', error)
    }
  }

  return (
    <form onSubmit={createTicket}>
      <div>
        <label>
          Holder Name:
          <input
            type="text"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Ticket Type:
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
          >
            <option value="Adult">Adult</option>
            <option value="Child">Child</option>
          </select>
        </label>
      </div>
      <button type="submit">Create Ticket</button>
    </form>
  )
}

export default TicketForm
