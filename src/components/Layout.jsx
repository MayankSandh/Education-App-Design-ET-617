import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import trackEvent from '../utils/trackEvent';

const Layout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    trackEvent('page_view', { path: location.pathname }, currentUser?.uid);
  }, [location.pathname, currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      trackEvent('logout', {}, currentUser?.uid);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLinkClick = (to) => {
    trackEvent('navigation_click', { to }, currentUser?.uid);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={() => handleLinkClick('/')}>Home</Link>
          </li>
          <li>
            <Link to="/content" onClick={() => handleLinkClick('/content')}>Content</Link>
          </li>
          <li>
            <Link to="/quiz" onClick={() => handleLinkClick('/quiz')}>Quiz</Link>
          </li>
          {!currentUser && (
            <>
              <li>
                <Link to="/login" onClick={() => handleLinkClick('/login')}>Login</Link>
              </li>
              <li>
                <Link to="/register" onClick={() => handleLinkClick('/register')}>Register</Link>
              </li>
            </>
          )}
          {currentUser && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      {currentUser && <p>Logged in as: {currentUser.email}</p>}
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
