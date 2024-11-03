import Footer from "./Footer";
import Nav from "./nav";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom"; // Thêm useLocation

export default function User() {
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Kiểm tra có phải homepage không

  return (
    <>
      <Nav />
      {isHomePage && <Header />} {/* Header chỉ hiển thị khi ở homepage */}
      <Outlet />
      <Footer />
    </>
  );
}
