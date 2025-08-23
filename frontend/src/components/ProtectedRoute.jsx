import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelect } from "../redux/authSlice";

export default function ProtectedRoute({ children, role }) {
  const user = useSelector(authSelect.user);

  if (!user) {
    // not logged in → back to login
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    // logged in but wrong role
    return <Navigate to="/my-account" replace />;
  }

  // ✅ allowed
  return children;
}
