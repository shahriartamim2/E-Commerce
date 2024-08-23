import { useLoginUserQuery } from "@/services/authApi";
import { useState } from "react";

const Login = () => {
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="flex flex-col justify-center gap-6 ">
      <form action="" onSubmit={handleSubmit}>
        <div >
          <p htmlFor="email">Email</p>
          <input
            type="email"
            name="email"
            value={user.email}
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
          />
        </div>
        <div>
          <p htmlFor="password">Password</p>
          <input
            type="password"
            name="password"
            value={user.password}
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-outline btn-accent">Login</button>
      </form>
    </div>
  );
};

export default Login;
