import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login, register } from "../../../backend/Api/authAPI";
import "./Login.scss";
import { Button } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      toast.success("Đăng nhập thành công!");

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

      // Chuyển hướng dựa trên role
      if (response.user.role === "admin") {
        navigate("/admin");
      } else if (response.user.role === "instructor") {
        navigate("/instructor");
      } else {
        // Thay vì chỉ navigate, chúng ta sẽ reload trang
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    }
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    let formattedEmail = email.trim();
    if (!formattedEmail.includes("@")) {
      formattedEmail += "@gmail.com";
    } else if (!formattedEmail.endsWith("@gmail.com")) {
      toast.error("Vui lòng sử dụng địa chỉ email hợp lệ với @gmail.com");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    try {
      await register({
        username,
        email: formattedEmail,
        password,
        role,
      });
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      // Reset form và chuyển về form đăng nhập
      const container = document.getElementById("container");
      if (container) {
        container.classList.remove("active");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    }
  };

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container?.classList.add("active");
    };

    const handleLoginClick = () => {
      container?.classList.remove("active");
    };

    if (registerBtn && loginBtn && container) {
      registerBtn.addEventListener("click", handleRegisterClick);
      loginBtn.addEventListener("click", handleLoginClick);
    }

    // Cleanup
    return () => {
      if (registerBtn && loginBtn) {
        registerBtn.removeEventListener("click", handleRegisterClick);
        loginBtn.removeEventListener("click", handleLoginClick);
      }
    };
  }, []);

  return (
    <div className="form-user container" id="container">
      <div className="form-container sign-in">
        <form onSubmit={handleSubmitLogin}>
          {" "}
          <h1>ĐĂNG NHẬP</h1>
          <input
            type="text"
            placeholder="Địa chỉ Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng nhập</button>
          <button onClick={() => navigate(-1)} type="submit">
            {" "}
            Quay lại
          </button>
        </form>
      </div>

      <div className="form-container sign-up">
        <form onSubmit={handleSubmitRegister}>
          <h1>ĐĂNG KÝ</h1>
          <input
            type="text"
            placeholder="Tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Địa chỉ Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <select
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">1. Học viên</option>
            <option value="instructor" disabled style={{ color: "#ccc" }}>
              2. Giảng viên
            </option>
          </select>

          <button type="submit">Đăng ký</button>
          <Button
            className="btn-back"
            onClick={() => navigate(-1)}
            style={{ marginBottom: 16 }}
          >
            Quay lại
          </Button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Mừng trở lại!</h1>
            <p>Đăng nhập để tham gia các khóa học cùng chúng tôi</p>
            <button className="hidden" id="login">
              Đăng Nhập
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome QT-Learning!</h1>
            <p>Nếu đã có tài khoản, hãy đăng nhập</p>
            <button className="hidden" id="register">
              Đăng Ký
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
