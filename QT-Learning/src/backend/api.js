import axios from "axios";

const API_URL = "http://localhost:9001/api";
// const { getAuthHeader } = require("./middleware/auth"); // Đường dẫn chính xác đến file auth.js

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Lấy danh sách người dùng (chỉ admin mới có quyền)
export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    console.log("Mã thông báo được tìm thấy trong localStorage:", user.token);
    return { Authorization: `Bearer ${user.token}` };
  }
  console.log("Không tìm thấy mã thông báo trong localStorage");
  return {};
};

// Đăng ký người dùng mới
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data); // In ra lỗi
    throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi
  }
};

// login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    console.log("Phản hồi đăng nhập:", response.data);
    if (response.data.token) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: response.data.token,
          ...response.data.user,
        })
      );
      console.log(
        "Mã thông báo đã được lưu vào localStorage:",
        response.data.token
      );
    } else {
      console.error("Không nhận được mã thông báo từ máy chủ");
    }
    return response.data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.response || error);
    throw error;
  }
};

//hàm để lấy thông tin người dùng
export const fetchUserProfile = async () => {
  try {
    console.log("Đang tải hồ sơ người dùng...");
    const headers = getAuthHeader();
    console.log("Headers:", headers);
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers,
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải hồ sơ người dùng:", error.response || error);
    throw error;
  }
};
// Lấy danh sách khóa học
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// src/api.js
export const fetchCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/courses/${id}`, {
      headers: getAuthHeader(), // Nếu bạn cần thêm header cho xác thực
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("Không thể tải khóa học.");
  }
};

export const getEnrolledCoursesAPI = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/enrollments?userId=${userId}&_expand=course`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Lỗi khi lấy danh sách khóa học đã đăng ký: " + error.message
    );
  }
};

// Thêm khóa học mới (chỉ instructor hoặc admin mới có quyền)
export const addCourse = async (courseData) => {
  const response = await axios.post(`${API_URL}/courses`, courseData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Cập nhật thông tin khóa học
export const updateCourse = async (courseId, courseData) => {
  const response = await axios.put(
    `${API_URL}/courses/${courseId}`,
    courseData,
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Xóa khóa học
export const deleteCourse = async (courseId) => {
  const response = await axios.delete(`${API_URL}/courses/${courseId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Lấy thông tin chi tiết khóa học (bao gồm các bài học và bài kiểm tra)
export const fetchCourseDetails = async (courseId) => {
  const response = await axios.get(`${API_URL}/courses/${courseId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Đăng ký khóa học (user đăng ký tham gia khóa học)
export const enrollCourse = async (courseId) => {
  const response = await axios.post(
    `${API_URL}/enrollments`,
    { course_id: courseId },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Hàm lấy tất cả các khóa học
export const fetchCoursesAPI = async (token) => {
  const response = await axios.get(`${API_URL}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// api.js - Update these functions
export const fetchLessonsAPI = async (moduleId, courseId) => {
  // Thêm tham số courseId
  try {
    let url;
    if (moduleId === "all") {
      url = `${API_URL}/lessons?courseId=${courseId}`; // Thêm courseId vào query
    } else {
      url = `${API_URL}/modules/${moduleId}/lessons`;
    }

    const response = await axios.get(url);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

export const addLessonAPI = async (lessonData, token) => {
  const response = await axios.post(
    `${API_URL}/courses/${lessonData.course_id}/lessons`,
    lessonData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateLessonAPI = async (lessonId, lessonData, token) => {
  const response = await axios.put(
    `${API_URL}/courses/${lessonData.course_id}/lessons/${lessonId}`,
    lessonData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteLessonAPI = async (courseId, lessonId, token) => {
  const response = await axios.delete(
    `${API_URL}/courses/${courseId}/lessons/${lessonId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
// Xử lý thanh toán cho khóa học
export const processPayment = async (paymentData) => {
  const response = await axios.post(`${API_URL}/payments`, paymentData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Lấy tiến độ học tập của người dùng
export const fetchProgress = async (courseId, userId) => {
  const response = await axios.get(
    `${API_URL}/progress?courseId=${courseId}&userId=${userId}`,
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Cập nhật tiến độ học tập
export const updateProgress = async (lessonId, progressData) => {
  const response = await axios.put(
    `${API_URL}/progress/${lessonId}`,
    progressData,
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Lấy danh sách chứng chỉ của người dùng
export const fetchCertificates = async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}/certificates`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Fetch modules
export const fetchModulesAPI = async (courseId) => {
  const response = await axios.get(`${API_URL}/courses/${courseId}/modules`);
  return response.data;
};

// Add a new module
export const addModuleAPI = async (moduleData, token) => {
  try {
    const response = await axios.post(`${API_URL}/modules`, moduleData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
};

// Update an existing module
export const updateModuleAPI = async (moduleId, moduleData) => {
  const response = await axios.put(
    `${API_URL}/modules/${moduleId}`,
    moduleData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete a module
export const deleteModuleAPI = async (moduleId) => {
  const response = await axios.delete(`${API_URL}/modules/${moduleId}`);
  return response.data;
};

// Hàm xử lý cập nhật module
export const handleUpdateModule = async (moduleId, values) => {
  try {
    await updateModuleAPI(moduleId, values); // Không cần token
    message.success("Module updated successfully");
    // Có thể gọi lại hàm fetchModules để tải lại danh sách modules
  } catch (error) {
    console.error("Error updating module:", error);
    message.error("Unable to update module. Please try again.");
  }
};

// Hàm xử lý xóa module
export const handleDeleteModule = async (moduleId) => {
  try {
    await deleteModuleAPI(moduleId); // Không cần token
    message.success("Module deleted successfully");
    // Có thể gọi lại hàm fetchModules để tải lại danh sách modules
  } catch (error) {
    console.error("Error deleting module:", error);
    message.error("Unable to delete module. Please try again.");
  }
};

// Hàm gọi để lấy danh sách modules
export const fetchModules = async (courseId) => {
  try {
    const modules = await fetchModulesAPI(courseId);
    // Xử lý dữ liệu modules ở đây
    console.log(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
  }
};

// đăng ký khóa học
export const enrollCourseAPI = async ({ userId, courseId }) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  const response = await axios.post(
    `${API_URL}/enrollments`,
    { userId, courseId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getEnrollmentsAPI = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/enrollments/${userId}`);
    return response.data; // Trả về danh sách đăng ký
  } catch (error) {
    throw new Error("Lỗi khi lấy thông tin đăng ký: " + error.message);
  }
};

export const completeCourseAPI = async (enrollmentId) => {
  try {
    const response = await axios.patch(`${API_URL}/complete/${enrollmentId}`);
    return response.data; // Trả về dữ liệu phản hồi
  } catch (error) {
    throw new Error("Lỗi khi đánh dấu hoàn thành khóa học: " + error.message);
  }
};
