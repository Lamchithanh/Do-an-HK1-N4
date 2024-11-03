import React from "react";
import "./Footer.scss";
const Footer = () => (
  <footer>
    <div className="columns">
      <div className="col">
        <h5>QT Learning</h5>
        <p>Điện thoại: 0780 399 0991</p>
        <p>Email: qtlearning@gmail.com</p>
        <p>Địa chỉ: Cần Thơ</p>
      </div>
      <div className="col">
        <h5>Về QT Learning</h5>
        <a href="#">Trang Chủ</a>
        <a href="#">Học Tập</a>
        <a href="#">Sự Kiện</a>
        <a href="#">Liên Hệ</a>
      </div>
      <div className="col">
        <h5>Các trang khác</h5>
        <a href="#">Đăng nhập | Đăng ký</a>
        <a href="#">Chính Sách</a>
      </div>
      <div className="col last">
        <h5>Lĩnh Vực Hoạt Động</h5>
        <p>
          {" "}
          Giáo dục, công nghệ - lập trình. Chúng tôi tập trung xây dựng và phát
          triển các sản phẩm mang lại giá trị cho cộng đồng lập trình viên Việt
          Nam.
        </p>
        <div className="social-links">
          <i className="bx bxl-instagram"></i>
          <i className="bx bxl-facebook-circle"></i>
          <i className="bx bxl-youtube"></i>
        </div>
      </div>
    </div>
    <div className="copyright">
      <p>Copyright © 2024 QT Learning, All Rights Reserved</p>
    </div>
  </footer>
);

export default Footer;
