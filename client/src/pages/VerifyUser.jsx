import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivateUserMutation } from "@/services/usersApi";

const VerifyUser = () => {
    const [activateUser, {isLoading, error}] = useActivateUserMutation();
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const activateUserByToken = async () => {
            if (token) {
                try {
                    const response = activateUser(token);
                    if (response.data.success) {
                        navigate("/");
                    } else {
                        navigate("/error");
                    }
                } catch (error) {
                    console.error("Activation failed:", error);
                    navigate("/error");
                }
            } else {
                navigate("/error");
            }
        };

        activateUserByToken();
    }, [token, navigate, activateUser]);

    return <div>Verifying your account...</div>;
};

export default VerifyUser;
