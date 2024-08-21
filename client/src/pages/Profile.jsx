import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedin) {
      navigate('/login')
    }
  }, [])

  const user = useSelector((state) => state.auth.user);
  console.log(user)

  return (
    <>
      {isLoggedin ? (
        <div>
          <h1>Profile Page</h1>
          <h3>{user.name}</h3>
          <Button variant='destructive'>Logout</Button>
        </div>
      ) : (
        <div>
          login to view profile
        </div>
      )}
    </>
  )
}

export default Profile
