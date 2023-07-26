import { useAuth } from '../../contexts/Account';
import { Toast } from "../Notifications";


const ProtectedRoute = ({ children }) => {
    const { authData, signOut } = useAuth()
    if (authData.isAuthenticated && authData.expiryTime > Date.now()) {
        return children
    }
    else{
        signOut()
    }
};

export default ProtectedRoute;
