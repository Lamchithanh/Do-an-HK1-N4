import { useState, useEffect } from "react";
import logo from "../../assets/Image/Logo.png";
import "boxicons/css/boxicons.min.css";
import "./Nav.scss";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/Image/avarta.png";

const Nav = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav>
      <div className="left">
        <div className="logo">
          <img src={logo} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <div className="links">
          <Link to="#">Trang Chủ</Link>
          <Link to="#">Học Tập</Link>
          <Link to="#">Sự Kiện</Link>
          <Link to="#">Về Chúng Tôi</Link>
          <Link to="#">Liên Hệ</Link>
        </div>
      </div>
      <div className="buttons">
        <button title="Hỗ trợ" className="bx bx-support"></button>
        <button title="Giỏ hàng" className="bx bx-basket"></button>
        <div className="user-menu">
          <button
            className="button-user"
            title={user ? user.username : "Tài khoản"}
            onClick={toggleDropdown}
          >
            {user ? (
              <div className="user-info">
                <img
                  src={user.avatarUrl || avatar}
                  alt="User Avatar"
                  className="avatar-img"
                />
                <span className="username">{user.username}</span>
              </div>
            ) : (
              <i className="bx bx-user"></i>
            )}
          </button>

          {dropdownVisible && (
            <div className="dropdown">
              <div className="dropdown-content">
                {user ? (
                  <>
                    <Link
                      to="/user-info"
                      className="dropdown-item"
                      onClick={() => setDropdownVisible(false)}
                    >
                      <i className="bx bx-user-circle"></i>
                      <span>Hồ Sơ</span>
                    </Link>
                    <Link
                      to="/"
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <i className="bx bx-log-out"></i>
                      <span>Đăng Xuất</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setDropdownVisible(false)}
                  >
                    <i className="bx bx-log-in"></i>
                    <span>Đăng Nhập</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
