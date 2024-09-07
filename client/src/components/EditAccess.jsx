import { useGetSingleUserQuery } from "@/services/usersApi"
import { useParams } from "react-router-dom";

const EditAccess = () => {
    const {id} = useParams();
    const {data, isLoading} = useGetSingleUserQuery(id);
    if(isLoading) return <div>Loading...</div>
    if(!data) return <div>no data found</div>

  return (
    <div>
      <span>User-type : {data.payload.user.isAdmain? "Admin" : "Normal"}</span>
      <br />
      <span>Ban Status : {data.payload.user.isBanned? "Banned" : "Not-Banned"}</span>
    </div>
  );
}

export default EditAccess
