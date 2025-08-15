import "../src/styles/index.css";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import LoginRequiredModal from "./components/common/loginRequiredModal";

function App() {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);
  return (
    <>
      <RouterProvider router={router} />
      <LoginRequiredModal />
    </>
  );
}

export default App;
