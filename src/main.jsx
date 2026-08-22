import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { SocketProvider } from "./Context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>

        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 5000,

            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid #334155",
              borderRadius: "18px",
              padding: "16px",
              minWidth: "360px",
            },
          }}
        />

      </SocketProvider>
    </AuthProvider>
  </StrictMode>
);