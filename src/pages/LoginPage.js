import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/forms/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="login-page">
      <h2>Login</h2>
      <LoginInput login={onLogin} />
      <div className="no-account">
        <p>
          Don&apos;t have an account?
          <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
