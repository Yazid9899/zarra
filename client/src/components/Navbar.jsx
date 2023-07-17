import Image from "react-bootstrap/Image";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  // if (!localStorage.getItem("access_token")) {
  //   return <div></div>;
  // }
  const logout = () => {
    localStorage.clear();
  };
  return (
    <nav>
      <a className="navbar-brand">
        <Image
          className="navbar-logo"
          src="https://cdn.freebiesupply.com/logos/large/2x/zara-2-logo-black-and-white.png"
        />
      </a>
      <div className="d-flex flex-column mx-4 ">
        <NavLink to="/" className="sideBar-content">
          <i className="bi bi-house-door mx-1"></i> DASHBOARD
        </NavLink>

        <NavLink className="sideBar-content" to="/categories">
          <i className="bi bi-tags mx-1"></i> CATEGORIES
        </NavLink>

        <NavLink className="sideBar-content" to="/register">
          <i className="bi bi-person-badge mx-1"></i> REGISTER
        </NavLink>
        <NavLink
          className="sideBar-content"
          to="/login"
          onClick={() => logout()}
        >
          <i className="bi bi-box-arrow-right mx-1"></i> LOG OUT
        </NavLink>
        <NavLink className="sideBar-content" to="/customers/home">
          <i className="bi bi-people mx-1"></i> customer page
        </NavLink>
      </div>
    </nav>
  );
}
