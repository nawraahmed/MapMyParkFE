import React, { useState } from 'react'
import ticketApi from '../api/ticketApi'
import '../App.css'

const TicketForm = ({ onCreate }) => {
  const [holderName, setHolderName] = useState('')
  const [ticketType, setTicketType] = useState('Adult') // Default to "Adult"

  const createTicket = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token') // Ensure token is sent
    const ticketData = {
      holderName,
      ticketType,
      issueDate: new Date().toISOString() // Ensure correct date format
    }

    try {
      const response = await ticketApi.createTicket(ticketData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      onCreate(response.data)
      setHolderName('') // Clear form after submission
      setTicketType('Adult') // Reset to default
    } catch (error) {
      console.error('Error creating ticket:', error)
      // Handle error
    }
  }

  return (
    <form className="col" onSubmit={createTicket}>
      <div className="input-wrapper">
        <label>
          Holder Name:
          <input
            type="text"
            value={holderName}
            placeholder="Holder Name"
            onChange={(e) => setHolderName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="input-wrapper">
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
      <button className="btn" type="submit">
        Create Ticket
      </button>
    </form>
  )
}

export default TicketForm
