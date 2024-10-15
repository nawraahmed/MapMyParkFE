import axios from 'axios'

const API_URL = 'http://localhost:4000/api/tickets'

const ticketApi = {
  createTicket: (ticketData) => axios.post(API_URL, ticketData),
  getTickets: () => axios.get(API_URL),
  getTicket: (id) => axios.get(`${API_URL}/${id}`),
  deleteTicket: (id) => axios.delete(`${API_URL}/${id}`)
}

export default ticketApi
