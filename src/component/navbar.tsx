import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Navbar.css'; // Import the new CSS file

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-header">
        <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <NavLink to="/" className="site-title">
          <span>Quotes</span>
        </NavLink>
      </div>
      
      <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
        <NavLink 
          to="/login" 
          onClick={toggleMenu}
        >
          Login
        </NavLink>
        <NavLink 
          to="/register" 
          onClick={toggleMenu}
        >
          Register
        </NavLink>
        <NavLink 
          to="/create-post" 
          onClick={toggleMenu}
        >
          Create Post
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
