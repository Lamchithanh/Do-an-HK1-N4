import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Fonrtend/context/AuthContext.jsx";
import { LoadingProvider } from "./Fonrtend/context/LoadingContext.jsx";

const renderApp = () => {
  createRoot(document.getElementById("root")).render(
    <LoadingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LoadingProvider>
  );
};

// Hiển thị app sau 1 giây để đảm bảo các thành phần được tải
setTimeout(renderApp, 1000);
