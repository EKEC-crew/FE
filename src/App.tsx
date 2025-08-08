import "../src/styles/index.css";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
