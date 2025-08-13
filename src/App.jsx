import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Content from './components/Content';
import Layout from './components/Layout';
import { trackEvent } from './utils/trackEvent';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    trackEvent('page_view', { path: location.pathname });
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {user && (
          <Route path="content" element={<Content />} />
        )}
      </Route>
    </Routes>
  );
}

export default App;
