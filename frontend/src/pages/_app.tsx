// pages/_app.tsx
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import React from "react";
import AuthController from "@/components/auth/AuthController";
import "@/styles/app.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the default styles
import { logger } from "@/logging/logger";
import { useRouter } from "next/router"; // Import the useRouter hook

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter(); // Use the useRouter hook to access the router object
  const pathname = router.pathname;
  logger.log("pathname::", pathname);
  // List of page routes where you want to apply the AuthController
  const unProtectedRoutes = ["/auth/login", "/auth/signup", "/dashboard"];

  return (
    <Provider store={store}>
      <ToastContainer />

      {/* Wrap the Component with AuthController for protected routes */}
      {pathname && unProtectedRoutes.includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        // <AuthController>
        <Component {...pageProps} />
        // </AuthController>
      )}
    </Provider>
  );
};

export default MyApp;
