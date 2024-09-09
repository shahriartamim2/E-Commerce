import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivateUserMutation } from "@/services/usersApi";
import PageTitle from "@/components/PageTitle";

const VerifyUser = () => {
  const [activateUser, { isLoading, error }] = useActivateUserMutation();
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const activateUserByToken = async (token) => {
      if (token) {
        try {
          await activateUser({ token }).unwrap();
          navigate("/login"); 
        } catch (error) {
          console.error("Activation failed:", error);
          return <div>{error.message}</div> 
        }
      } else {
        navigate("/error"); 
      }
    };

    activateUserByToken(token);
  }, [token, navigate, activateUser]);

  return (
    <>
      <PageTitle title="Verifying" />
      <div>Verifying your account...</div>
    </>
  );
};

export default VerifyUser;
