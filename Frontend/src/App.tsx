import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLayout from "./layout/UserLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AgentDashboard from "./pages/AgentDashboard";
import AddProperty from "./pages/AddProperty";
import Favorites from "./pages/Favorites";
import Register from "./pages/Register";
import FAQ from "./components/FAQ";
import Properties from "./pages/Properties";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute allowedRoles={['agent']} />}>
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/agent/add-property" element={<AddProperty />} />
          </Route>


          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/properties" element={<Properties />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App