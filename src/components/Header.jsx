import logo from '../assets/LOGO.png'
import '../styles/header.css'
// import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  return(
    <header>
      <img src={logo} alt="logo" className='logo'/>
      <input type="text" aria-label='Rechercher un film' placeholder="Rechercher un film" alt='rechercher un film' />

      <Menu />
    </header>
  )
}

function Menu() {
  // const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          {/* <NavLink to="/" style={{ 
              textDecoration: location.pathname === "/" ? "underline" : "none"
            }}> */}
            Accueil
          {/* </NavLink> */}
        </li>
        <li>
          {/* <NavLink to="/about" style={{
              textDecoration: location.pathname === "/about" ? "underline" : "none"
            }}> */}
            Mon Crew
          {/* </NavLink> */}
        </li>
      </ul>
    </nav>
  );
}