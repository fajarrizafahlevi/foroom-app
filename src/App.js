import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { RiDiscussFill } from 'react-icons/ri';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  if (isPreload) {
    return null;
  }

  return (
    <div className="app">
      <header className="top-bar">
        <i className="app-icon">
          <RiDiscussFill />
        </i>
        <h1 className="app-name">
          {'  '}
          Foroom
        </h1>
        <Loading />
      </header>
      {authUser === null ? (
        <>
          <main>
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/threads/:id"
                element={<DetailPage />}
              />
              <Route
                path="/leaderboards"
                element={<LeaderboardsPage />}
              />
              <Route
                path="/login"
                element={<LoginPage />}
              />
              <Route
                path="/register"
                element={<RegisterPage />}
              />
            </Routes>
          </main>
          <footer>
            <Navigation authUser={authUser} />
          </footer>
        </>
      ) : (
        <>
          <main>
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/new"
                element={<AddPage />}
              />
              <Route
                path="/threads/:id"
                element={<DetailPage />}
              />
              <Route
                path="/leaderboards"
                element={<LeaderboardsPage />}
              />
            </Routes>
          </main>
          <footer>
            <Navigation
              authUser={authUser}
              logout={onLogout}
            />
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
