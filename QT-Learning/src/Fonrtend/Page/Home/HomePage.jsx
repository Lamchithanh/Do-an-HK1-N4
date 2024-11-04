import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCoursesAPI } from "../../../backend/Api/courseApi";
import { useLoading } from "../../context/LoadingContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Content.scss";

const Content = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const itemsToShow = 4;

  useEffect(() => {
    const loadCourses = async () => {
      showLoading();
      try {
        const data = await fetchCoursesAPI();
        setCourses(data);
      } catch (err) {
        setError("Không thể tải khóa học");
      } finally {
        hideLoading();
      }
    };

    loadCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const next = () => {
    if (isAnimating || !courses.length) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating || !courses.length) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getVisibleCourses = () => {
    if (!courses.length) return [];
    let items = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % courses.length;
      items.push(courses[index]);
    }
    return items;
  };

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

      <div className="courses-slideshow relative">
        <div className="overflow-hidden">
          <div className="courses-container flex transition-transform duration-500 ease-in-out gap-4">
            {getVisibleCourses().map((course, idx) => (
              <div
                key={`${course.id}-${idx}`}
                className="course-item flex-none w-1/4"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="item">
                  <div className="top">
                    <img
                      src={course.image || "./Image/Nhap Mon.jpg"}
                      alt={course.title}
                    />
                    <div className="info">
                      <span
                        style={{
                          fontWeight: "bold",
                          marginTop: "15px",
                          color: "#e25316",
                        }}
                      >
                        {course.title}
                      </span>
                      <p>QT Learning</p>
                      <p>Thời gian học: {course.duration || "121h10p"}</p>
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="price">
                      <h5>
                        {course.price === "0" || course.price === "0.00"
                          ? "Miễn phí"
                          : `${course.price} VND`}
                      </h5>
                    </div>
                    <h5 className="tag">
                      <span>{course.level}</span>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button navigation */}
        <button onClick={prev} className="nav-button left">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button onClick={next} className="nav-button right">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="separator review">
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
