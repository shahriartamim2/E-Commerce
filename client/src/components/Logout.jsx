import { useLogoutMutation } from '@/services/authApi';
import { useDispatch } from 'react-redux';
import { logOut } from '@/features/auth/authSlice';

const Logout = () => {
    const [logout, { isLoading }] = useLogoutMutation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await logout().unwrap(); // Ensure proper error handling
            if (response?.data?.message === 'Logged out successfully') {
                dispatch(logOut()); // Clear the user's data from Redux state
            } else {
                console.error('Failed to log out:', response);
            }
        } catch (error) {
            console.error('Logout mutation failed:', error);
        }
    };

    return (
        <button onClick={handleLogout} disabled={isLoading} className="btn btn-error">
            {isLoading ? 'Logging out...' : 'Logout'}
        </button>
    );
};
export default Logout;
