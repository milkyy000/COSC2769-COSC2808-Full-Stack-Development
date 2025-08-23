import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterCustomer from "./pages/RegisterCustomer";
import RegisterVendor from "./pages/RegisterVendor";
import RegisterShipper from "./pages/RegisterShipper";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registerCustomer" element={<RegisterCustomer />} />
        <Route path="/registerVendor" element={<RegisterVendor />} />
        <Route path="/registerShipper" element={<RegisterShipper />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
