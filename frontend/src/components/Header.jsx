const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Map My Park</h1>
      </div>
      <div className="header-right">
        <nav className="header-nav">
          <a href="#tickets" className="nav-link">
            Tickets
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
        </nav>
        <button className="sign-in-btn">Sign In</button>
      </div>
    </header>
  )
}

export default Header
