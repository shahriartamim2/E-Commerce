import { useDispatch } from "react-redux";
import Index from "./routes/Index";
import { useEffect } from "react";
import { authCheck } from "./features/auth/authSlice";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <div className="bg-bgColor w-full min-h-screen flex flex-col">
      <Index />
    </div>
  );
};

export default App;
