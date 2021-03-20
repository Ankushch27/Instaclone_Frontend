import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { useAuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const {
    loginState: {
      userData: { _id },
    },
    loginDispatch,
  } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="brand-logo">
          <Link to="/">Instagram</Link>
        </div>
        <div>Search</div>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link">
              <FontAwesomeIcon icon="home" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/explore" className="nav-link">
              <FontAwesomeIcon icon="paper-plane" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/${_id}`} className="nav-link">
              <FontAwesomeIcon icon="user" />
            </NavLink>
          </li>
          <li className="nav-item" onClick={() => logout(loginDispatch)}>
            <FontAwesomeIcon icon="sign-out-alt" />
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
