
import { useDispatch } from 'react-redux';
import Index from './routes/Index'
import { useEffect } from 'react';
import { authCheck } from './features/auth/authSlice';
import './index.css'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);
  
  return (
    <div className="bg-bgColor" >
      <div className="container w-full ">
        <Index />
      </div>
    </div>
  );
}

export default App
