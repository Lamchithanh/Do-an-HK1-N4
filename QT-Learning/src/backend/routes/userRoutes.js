const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { forgotPassword } = require("../controllers/ForgotPassword");
const { authMiddleware } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../assets/images")); // Đặt thư mục lưu trữ là assets/images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên tệp với thời gian hiện tại
  },
});

const upload = multer({ storage });
// Route để lấy danh sách người dùng (không cần xác thực nữa)
router.get("/users", userController.getAllUsers);
// Route để đăng nhập
router.post("/users/login", userController.login);

// Route để đăng ký
router.post("/users/register", userController.register);

// Route để lấy lại mật khẩu
router.post("/forgot-password", forgotPassword);

// Route to fetch current logged-in user's profile based on token
router.get("/users/profile", authMiddleware, userController.getUserProfile);

router.post("/change-password", authMiddleware, userController.changePassword);
// Route để đăng xuất
router.post("/logout", userController.logout);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id/lock", userController.toggleUserLock);
router.post(
  "/upload-avatar",

  upload.single("avatar"),
  userController.uploadAvatar
);

module.exports = router;
