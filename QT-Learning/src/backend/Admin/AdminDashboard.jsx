import React, { useState, useCallback } from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  BookOutlined,
  PlayCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Courses from "./AdCourses/Courses.jsx";
import Users from "./AdUsers/Users.jsx";
import Lessons from "./Adlessons/lessons.jsx";

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("users");

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9001/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }, []);

  const fetchCourses = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9001/api/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }, []);

  const fetchLessons = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9001/api/lessons", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }, []);

  const fetchModules = useCallback(async (courseId) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:9001/api/courses/${courseId}/modules`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }, []);

  const renderContent = () => {
    switch (selectedMenu) {
      case "users":
        return <Users fetchUsers={fetchUsers} />;
      case "courses":
        return <Courses fetchCourses={fetchCourses} />; // Truyền fetchCourses
      case "lessons":
        return (
          <Lessons
            fetchLessons={fetchLessons}
            fetchCourses={fetchCourses}
            fetchModules={fetchModules}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          className="logo"
          style={{ height: "64px", padding: "16px", color: "white" }}
        >
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["users"]}
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="courses" icon={<BookOutlined />}>
            Courses
          </Menu.Item>
          <Menu.Item key="lessons" icon={<PlayCircleOutlined />}>
            Lessons & Modules
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            icon={
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/stencil/32/exit.png"
                alt="exit"
              />
            }
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
