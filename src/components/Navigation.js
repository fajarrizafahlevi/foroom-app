import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, logout }) {
  return (
    <nav>
      {
        authUser === null
          ? (
            <ul>
              <li>
                <Link to="/">Threads</Link>
              </li>
              <li>
                <Link to="/leaderboards">Leaderboards</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/">Threads</Link>
              </li>
              <li>
                <Link to="/leaderboards">Leaderboards</Link>
              </li>
              <button
                className="logout-button"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </ul>
          )
      }
    </nav>
  );
}

Navigation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  authUser: PropTypes.object,
  logout: PropTypes.func,
};

Navigation.defaultProps = {
  authUser: null,
  logout: null,
};

export default Navigation;
