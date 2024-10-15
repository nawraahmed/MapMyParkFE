// ticketService.js
export async function fetchTickets() {
  const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL + '/tickets'
    : 'https://default-backend-url.com/api/tickets' // Fallback if process.env fails

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Add any other necessary headers like Authorization tokens here
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json() // Assuming the backend returns JSON
    return data
  } catch (error) {
    console.error('Failed to fetch tickets:', error)
    throw error
  }
}
