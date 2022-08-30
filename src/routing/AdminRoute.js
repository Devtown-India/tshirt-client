import { useSelector } from "react-redux";
import { Navigate } from "react-router";


const AdminRoute = ({ children }) => {
    const { token,user,authLoaded } = useSelector(state => state.auth)
    return authLoaded && token != null && user.role>0 ? children : <Navigate to='/' />
}

export default AdminRoute;