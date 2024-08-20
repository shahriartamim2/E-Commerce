import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
  return (
    <div>
      <h1>Profile Page</h1>
      <h3>{user.name}</h3>
      <button className="">
        logout
      </button>
    </div>
  )
}

export default Profile
