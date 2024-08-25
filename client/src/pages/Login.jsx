import { useState } from 'react';


const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  return (
    <div className="flex flex-col justify-center gap-6">
      <form >
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
        
      </form>
    </div>
  );
};

export default Login;
