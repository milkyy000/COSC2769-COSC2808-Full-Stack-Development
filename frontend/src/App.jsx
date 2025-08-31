import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { fetchMyAccount, authSelect } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

  // ✅ use selector functions from authSlice
  const initialized = useSelector(authSelect.initialized);
  const loading = useSelector(authSelect.loading);

  useEffect(() => {
    dispatch(fetchMyAccount()); // restore session once
  }, [dispatch]);

  if (!initialized || loading) {
    // ⏳ show loader while checking session
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
