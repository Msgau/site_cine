import "../styles/menu.css";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className="menu">
      <h2>Menu</h2>
      <ul>
        <li>
          <NavLink to="/site_cine/">Accueil</NavLink>
        </li>
      </ul>
    </div>
  );
}
