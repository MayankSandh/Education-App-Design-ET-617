import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

function Layout({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/content">Game Theory</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
