import React, { useState } from 'react'

const MapMarker = ({ name, imageUrl, top, left, size, indoor, age }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <div
      className="map-marker"
      style={{
        top: `${top}`,
        left: `${left}`,
        zIndex: isHovered ? 10 : 1
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Keep the image always visible */}
      <img src={imageUrl} alt={name} className="img-resize" />

      {/* Show the popup content when hovered */}
      {isHovered && (
        <div className="modal-popup">
          <h4>{name}</h4>
          {/* Conditional rendering for the button text */}
          {name === 'Ticket Booth' ? (
            <button className="book-online-button">Book Online</button>
          ) : (
            <>
              <button className="book-online-button">View Details</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default MapMarker
