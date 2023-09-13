import logo from '../assets/LOGO.png'
import '../styles/header.css'
import MovieSearch from './MovieSearch';
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  return(
    <header>
      <div className='logo_title'>
      <img src={logo} alt="logo" className='logo'/>
      <h1><NavLink to="/">Ciné Crew</NavLink></h1>
      </div>
      <MovieSearch />
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
          <NavLink to="/site_cine/">
            Accueil
          </NavLink>
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