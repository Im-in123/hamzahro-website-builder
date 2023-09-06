import React, { useState } from "react";
import SignupForm from "../../components/auth/SignupForm";
import styles from "../../styles/pages/auth/Login.module.css";
import { logger } from "../../logging/logger";
import { SIGNUP_URL, LOGIN_URL } from "@/constants/urls";
import { axiosHandler, errorHandler } from "../../utils/auth/api";
import { ACCESS_TOKEN_COOKIE } from "@/constants/others";
import { saveTokenToLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";

const SignupPage: React.FC = () => {
  const [signupData, setSignupData] = useState<{
    email?: string;
    password?: string;
  }>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [showSignupPassword, setShowSignupPassword] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<any>();
  const router = useRouter();

  const loginRequest = async () => {
    logger.log("logging in...");
    //sends login  credentials to server for authentication
    const result = await axiosHandler({
      method: "POST",
      url: LOGIN_URL,
      data: signupData,
    }).catch((e) => logger.error(e));
    if (result) {
      logger.log(result);
      //add user access  token received from server to browser local storage if user is authenticated
      const token = result.data.accessToken;
      saveTokenToLocalStorage(ACCESS_TOKEN_COOKIE, token);
      return true;
    }
    return false;
  };
  const onSubmitSignup = async () => {
    logger.log("Signup data:", signupData);
    setLoading(true);
    setSignupError(null);

    setLoading(true);
    //Send signup data to server
    const result = await axiosHandler({
      method: "POST",
      url: SIGNUP_URL,
      data: signupData,
    }).catch((e: any) => {
      logger.error(e);
      const err = errorHandler(e, true);
      setSignupError(err.message.message);
    });
    if (result) {
      logger.log("Result::", result);

      if (await loginRequest()) {
        router.push("/dashboard");
      }
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Signup Page</h1>
      <SignupForm
        signupData={signupData}
        setSignupData={setSignupData}
        showSignupPassword={showSignupPassword}
        setShowSignupPassword={setShowSignupPassword}
        signupError={signupError}
        setSignupError={setSignupError}
        loading={loading}
        setLoading={setLoading}
        onSubmitSignup={onSubmitSignup}
      />
    </div>
  );
};

export default SignupPage;
