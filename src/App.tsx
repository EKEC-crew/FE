import "./styles/index.css";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import LoginRequiredModal from "./components/common/loginRequiredModal";
import SessionModal from "./components/common/sessionModal";

function App() {
  const { initAuth, showSessionModal } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <RouterProvider router={router} />
      <SessionModal />
      {!showSessionModal && <LoginRequiredModal />}
    </>
  );
}

export default App;
