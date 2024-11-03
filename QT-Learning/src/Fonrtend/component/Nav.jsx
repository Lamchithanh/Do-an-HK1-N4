import logo from "../../assets/Image/Logo.png";
import "boxicons/css/boxicons.min.css";
import "./Nav.scss";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="left">
        <div className="logo">
          <img src={logo} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <div className="links">
          <a href="#">Trang Chủ</a>
          <a href="#">Học Tập</a>
          <a href="#">Sự Kiện</a>
          <a href="#">Về Chúng Tôi</a>
          <a href="#">Liên Hệ</a>
        </div>
      </div>
      <div className="buttons">
        <a href="#">
          <i className="bx bx-support"></i>
        </a>
        <a href="#">
          <i className="bx bx-basket"></i>
        </a>
        <a href="#">
          <i className="bx bx-user"></i>
        </a>
      </div>
    </nav>
  );
};

export default Nav;
