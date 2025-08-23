import { useSelector } from "react-redux";
import { authSelect } from "../src/redux/authSlice";

export default function MyAccount() {
  const user = useSelector(authSelect.user);
  const initialized = useSelector(authSelect.initialized);
  const loading = useSelector(authSelect.loading);

  if (loading && !initialized) {
    return <p>Loading...</p>;
  }

  if (!loading && !user && initialized) {
    return <p>You are not logged in.</p>;
  }

  if (!user) {
    return <p>Loading user data...</p>; // fallback, should not happen
  }

  return (
    <div>
      <h2>My account</h2>
      <p>Role: {user.role}</p>
      <p>Username: {user.username}</p>
      {user.name && <p>Name: {user.name}</p>}
      {user.address && <p>Address: {user.address}</p>}
      {user.businessName && <p>Business Name: {user.businessName}</p>}
      {user.businessAddress && <p>Business Address: {user.businessAddress}</p>}
      {user.distributionHub && <p>Hub: {user.distributionHub}</p>}
    </div>
  );
}
