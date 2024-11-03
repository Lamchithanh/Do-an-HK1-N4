import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCoursesAPI } from "../../../backend/Api/courseApi";
import "./Content.scss";

const Content = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCoursesAPI();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải khóa học");
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    return <div className="content loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="content error">{error}</div>;
  }

  return (
    <div className="content">
      <div className="separator">
        <h2>Khóa học phổ biến</h2>
        <Link to="#">
          Tất Cả <i className="bx bx-right-indent"></i>
        </Link>
      </div>

      <div className="courses">
        {courses.map((course) => (
          <div
            key={course.id}
            className="item"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <div className="top">
              <img
                src={course.image || "./Image/Nhap Mon.jpg"}
                alt={course.title}
              />
              <div className="info">
                <span>{course.title}</span>
                <p>Tác giả: {course.instructor_name || "ABC"}</p>
                <p>Thời gian học: {course.duration || "121h10p"}</p>
              </div>
            </div>
            <div class="bottom">
              <div class="price">
                <h5>Miễn Phí</h5>
              </div>
              <h5 class="tag">
                <span>+1000 </span>Học Viên
              </h5>
            </div>
          </div>
        ))}
      </div>

      <div className="separator">
        <h2>Đánh Giá Của Học Viên</h2>
      </div>
      <div className="comments">
        <p>
          Nhận xét từ các học viên của QT Learning giúp bạn lựa chọn được khóa
          học phù hợp với bản thân
        </p>
        <div className="right">
          <div className="item">
            <img src="./Image/avt1.jpg" alt="Avatar" />
            <p>Tôi đã lấy lại được căn bản của khóa học Lập trình C</p>
          </div>
        </div>
      </div>

      <div className="separator">
        <h2>Các Video Phổ Biến</h2>
        <Link to="#">
          Tất Cả <i className="bx bx-right-indent"></i>
        </Link>
      </div>

      <div className="articles">
        <div className="item">
          <div className="top">
            <img src="./Image/vid_6G.png" alt="Mạng 6G" />
            <h5>Mạng 6G là gì?</h5>
          </div>
          <div className="bottom">
            <h5>
              <span>+700</span> lượt xem
            </h5>
            <Link to="#">
              Xem thêm <i className="bx bx-chevron-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
