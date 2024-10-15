import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MapMarker from './MapMarker' // Ensure this path is correct

const Map = () => {
  const [attractions, setAttractions] = useState([])

  // Fetch attractions from your API
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/attraction/index'
        )
        console.log(response.data)
        setAttractions(response.data)
      } catch (error) {
        console.error('Error fetching attractions:', error)
      }
    }

    fetchAttractions()
  }, [])

  return (
    <div>
      {/* Slogan Section */}
      <div className="slogan-container">
        <h1>Adventure Awaits!</h1>
      </div>

      {/* Map container */}
      <div className="map-container">
        {attractions.map((attraction) => (
          // Use MapMarker component
          <MapMarker
            key={attraction._id}
            name={attraction.name}
            imageUrl={attraction.imageUrl}
            top={attraction.top}
            left={attraction.left}
            size={attraction.size}
            indoor={attraction.indoor}
            age={attraction.age}
          />
        ))}
      </div>
    </div>
  )
}

export default Map
