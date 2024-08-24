import { useState } from 'react';
import { useLoginUserMutation } from '@/services/authApi';
import { setUserInfo } from '@/features/auth/userSlice';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { saveUserInfo } from '@/services/localStorage';

const Login = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(user).unwrap();
      console.log('Login successful:', result);
      const userInfo = result.payload.user;
      dispatch(setUserInfo(userInfo));
      saveUserInfo(userInfo);
      navigate('/profile'); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-6">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-outline btn-accent" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-500">Login failed: {error.data?.message || error.status}</p>}
      </form>
    </div>
  );
};

export default Login;
