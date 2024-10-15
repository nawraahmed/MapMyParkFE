import Header from './Header'
import Map from './Map'

const MainContent = () => {
  return (
    <div className="mainContentSize">
      {/* Mount the header here */}
      <Header />
      {/* Main content */}
      <Map />
    </div>
  )
}

export default MainContent
