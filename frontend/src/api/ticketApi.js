import axios from 'axios'

const API_URL = 'http://localhost:4000/api/tickets'

const getAuthHeader = () => {
  const token = localStorage.getItem('token') // Get the token from local storage
  return { Authorization: `Bearer ${token}` }
}

const ticketApi = {
  createTicket: (ticketData) =>
    axios.post(API_URL, ticketData, { headers: getAuthHeader() }),
  getTickets: () => axios.get(API_URL, { headers: getAuthHeader() }),
  getTicket: (id) =>
    axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() }),
  deleteTicket: (id) =>
    axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() })
}

export default ticketApi
