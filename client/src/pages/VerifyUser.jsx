import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivateUserMutation } from "@/services/usersApi";
import PageTitle from "@/components/PageTitle";

const VerifyUser = () => {
  const [activateUser, { isLoading, error }] = useActivateUserMutation();
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const activateUserByToken = async () => {
      if (token) {
        try {
          // Assuming activateUser is a mutation function that needs to be called with token
          await activateUser({ token }).unwrap();
          navigate("/"); // Redirect to the homepage or success page after activation
        } catch (error) {
          console.error("Activation failed:", error);
          navigate("/error"); // Redirect to an error page on failure
        }
      } else {
        navigate("/error"); // Redirect to an error page if no token is provided
      }
    };

    activateUserByToken();
  }, [token, navigate, activateUser]);

  return (
    <>
      <PageTitle title="Verifying" />
      <div>Verifying your account...</div>
    </>
  );
};

export default VerifyUser;
