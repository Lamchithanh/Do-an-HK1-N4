import { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Alert,
  Button,
  Layout,
  Avatar,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons"; // Đừng quên import UserOutlined
import { updateUserAvatar } from "../../../backend/Api/userApi.js";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Sử dụng hook navigate để điều hướng
  const [avatar, setAvatar] = useState("../../../assets/Image/avarta.png"); // Đặt giá trị mặc định cho avatar

  useEffect(() => {
    const userData = localStorage.getItem("user"); // Lấy thông tin người dùng từ localStorage
    if (userData) {
      setUser(JSON.parse(userData)); // Chuyển đổi dữ liệu thành đối tượng
    } else {
      setError("Không tìm thấy thông tin người dùng.");
    }
    setLoading(false); // Kết thúc quá trình tải
  }, []);

  useEffect(() => {
    // Cập nhật avatar nếu user có giá trị
    if (user && user.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleAvatarUpload = (file) => {
    // Upload the file to the server and get the new avatar URL
    updateUserAvatar(file).then((newAvatarUrl) => {
      setAvatar(newAvatarUrl);
    });
  };

  if (loading) {
    return <p>Đang tải thông tin người dùng...</p>;
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }

  if (!user) {
    return (
      <Alert
        message="Thông báo"
        description="Không tìm thấy thông tin người dùng. Vui lòng kiểm tra lại kết nối hoặc liên hệ hỗ trợ."
        type="warning"
        showIcon
      />
    );
  }

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString() : "Không rõ";
  };

  return (
    <>
      <Layout>
        <Header style={{ height: "60vh" }}>
          <Card>
            <div className="flex items-center">
              <img
                src={avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full mr-4"
              />
              <Upload
                showUploadList={false}
                onChange={handleAvatarUpload}
                maxCount={1}
              >
                <Button type="primary" icon={<UserOutlined />}>
                  Upload New Avatar
                </Button>
              </Upload>
            </div>
          </Card>
        </Header>
      </Layout>
      <Layout>
        <Content>
          <Card title="Thông tin người dùng" style={{ width: "100%" }}>
            <Descriptions layout="vertical" bordered>
              <Descriptions.Item label="Tên người dùng">
                {user.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Vai trò">
                {user.role === "admin"
                  ? "Quản trị viên"
                  : user.role === "instructor"
                  ? "Giảng viên"
                  : "Học viên"}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {formatDate(user.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Cập nhật lần cuối">
                {formatDate(user.updatedAt)}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              style={{ marginTop: "16px" }}
              onClick={() => navigate("/change-password")} // Chuyển hướng tới trang đổi mật khẩu
            >
              Đổi mật khẩu
            </Button>
            <Button
              type="default"
              style={{ marginLeft: "8px", marginTop: "16px" }}
              onClick={() => navigate("/account-settings")} // Chuyển hướng tới trang cài đặt tài khoản
            >
              Cài đặt tài khoản
            </Button>
          </Card>
        </Content>
      </Layout>
    </>
  );
};

export default UserInfo;
