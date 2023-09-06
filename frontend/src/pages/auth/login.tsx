import React, { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import styles from "../../styles/pages/auth/Login.module.css";
import { logger } from "../../logging/logger";
import { axiosHandler, errorHandler } from "../../utils/auth/api";
import { LOGIN_URL } from "@/constants/urls";
import { saveTokenToLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN_COOKIE } from "@/constants/others";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<any>();
  const router = useRouter();

  const onSubmitLogin = async () => {
    setLoading(true);
    setLoginError(null);

    setLoading(true);
    //Send signup data to server
    logger.log("logindata:", loginData);
    const result = await axiosHandler({
      method: "POST",
      url: LOGIN_URL,
      data: loginData,
    }).catch((e: any) => {
      logger.error(e);
      const err = errorHandler(e, true);

      setLoginError(err.message.message);
    });
    if (result) {
      logger.log("Result::", result);
      const token = result.data.accessToken;
      saveTokenToLocalStorage(ACCESS_TOKEN_COOKIE, token);
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Login Page</h1>
      <LoginForm
        loginData={loginData}
        setLoginData={setLoginData}
        showLoginPassword={showLoginPassword}
        setShowLoginPassword={setShowLoginPassword}
        loginError={loginError}
        setLoginError={setLoginError}
        loading={loading}
        setLoading={setLoading}
        onSubmitLogin={onSubmitLogin}
      />
    </div>
  );
};

export default LoginPage;
