import React, { useState } from 'react'
import ticketApi from '../api/ticketApi'
import '../App.css'

const TicketForm = ({ onCreate }) => {
  const [holderName, setHolderName] = useState('')
  const [ticketType, setTicketType] = useState('Adult') // Default to "Adult"

  const createTicket = async () => {
    const ticketData = {
      holderName: holderName,
      ticketType: ticketType, // Ensure this matches what the server expects
      issueDate: new Date().toISOString() // Make sure the date is in the correct format
    }

    try {
      const response = await ticketApi.createTicket(ticketData)
      onCreate(response.data)
      setHolderName('') // Clear form after submission
      setTicketType('Adult') // Reset to default value
    } catch (error) {
      console.error('Error creating ticket:', error)
      // You can add additional error handling here if needed
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
