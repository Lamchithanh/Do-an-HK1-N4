import Footer from "./Footer";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useEffect } from "react";
import "./User.scss";

export default function User() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isUserInfoPage = location.pathname === "/user-info"; // Kiểm tra nếu đang ở trang UserInfo

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="layout-wrapper">
      <Nav />
      {isHomePage && <Header />}
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
