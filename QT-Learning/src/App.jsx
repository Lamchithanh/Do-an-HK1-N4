import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types"; // Thêm import PropTypes
import Login from "./Fonrtend/Page/Login/Login";
import Register from "./Fonrtend/Page/Login/Register";
import ForgotPassword from "./Fonrtend/Page/Login/ForgotPassword";
import AdminDashboard from "./backend/Admin/AdminDashboard";
import User from "./Fonrtend/component/User";
import MyCourses from "./Fonrtend/Page/MyCourses/MyCourses";
import AccountSettings from "./Fonrtend/Page/AccountSettings/AccountSettings";
import CourseDetail from "./Fonrtend/Page/CourseDetail/CourseDetail";
import UserInfo from "./Fonrtend/Page/UserInfo/UserInfo";
import Content from "./Fonrtend/Page/Home/HomePage";
import { LoadingProvider } from "./Fonrtend/context/LoadingContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // Kiểm tra xem người dùng có quyền truy cập hay không
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Thêm khai báo PropTypes cho các props
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const App = () => (
  <LoadingProvider>
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/" element={<User />}>
            <Route index element={<Content />} />
            <Route path="user-info" element={<UserInfo />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="courses/:id" element={<CourseDetail />} />{" "}
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  </LoadingProvider>
);

export default App;
