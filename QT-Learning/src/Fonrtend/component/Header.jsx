import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { API_URL } from "../../backend/config/config";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category] = useState("all");
  const [level] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/search`, {
          params: {
            query,
            category,
            level,
          },
        });

        if (response.data.success) {
          setResults(response.data.data);
        } else {
          console.error("Search failed:", response.data.message);
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [category, level]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (courseId) => {
    setResults([]);
    setSearchQuery("");
    navigate(`/courses/${courseId}`);
  };

  return (
    <header>
      <div className="info">
        <h1>QT Learning - Lập Trình Không Khó</h1>
        <p>Nơi xây dựng nền tảng đến chuyên nghiệp cho bạn!</p>
      </div>
      <div className="buttons">
        <button className="see-all">Xem Khóa Học</button>
        <button>Lập trình là gì?</button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button>
          <i className="bx bx-search"></i>
        </button>
      </div>
      {loading && <div className="loading">Đang tìm kiếm...</div>}
      {results.length > 0 && (
        <div className="search-results">
          {results.map((course) => (
            <div
              key={course.id}
              className="search-result-item"
              onClick={() => handleResultClick(course.id)}
            >
              {/* hiển thị khóa học */}
              <div className="courses">
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
                      <h4>{course.title}</h4>
                      <p>Tác giả: {course.instructor_name || "ABC"}</p>
                      <p>Thời gian học: {course.duration || "121h10p"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;