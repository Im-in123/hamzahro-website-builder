import React, { useState } from "react";
import styles from "../../styles/components/auth/LoginForm.module.css";
import { FaUserCircle, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import { MdEmail, MdClose } from "react-icons/md";
import { useRouter } from "next/router";

interface LoginFormProps {
  loginData: { email?: string; password?: string };
  setLoginData: React.Dispatch<
    React.SetStateAction<{
      email?: string;
      password?: string;
    }>
  >;
  showLoginPassword: boolean;
  setShowLoginPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loginError: any;
  setLoginError: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitLogin: () => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginData,
  setLoginData,
  showLoginPassword,
  setShowLoginPassword,
  loginError,
  setLoginError,
  loading,
  setLoading,
  onSubmitLogin,
}) => {
  const [emailError, setEmailError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const router = useRouter();
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = () => {
    setEmailError([]);
    setPasswordError([]);
    setShowLoginPassword(false);

    if (!loginData.email) {
      setEmailError(["Email is required"]);
      return false;
    }

    if (!loginData.password) {
      setPasswordError(["Password is required"]);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateInputs()) {
      await onSubmitLogin();
    }
    console.log("df::", passwordError);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <div className={styles.headerForm}>
          <h4 className={`${styles.textPrimary} ${styles.textCenter}`}>
            <FaUserCircle className={styles.icon} />
          </h4>
        </div>
        <div>
          {loginError && (
            <div className={styles.errorDiv}>
              {" "}
              <MdClose
                className={styles.errorDivIcon}
                onClick={() => setLoginError(null)}
              />
              <div className={styles.errorDiv}>
                <span>{loginError}</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.bodyForm}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <div className={styles.inputGroupPrepend}>
                <span className={styles.inputGroupIcon}>
                  <MdEmail />
                </span>
              </div>
              <input
                type="email"
                name="email"
                className={styles.input}
                placeholder="Email"
                defaultValue={loginData.email}
                onChange={onChangeLogin}
                disabled={loading}
                required
              />
            </div>

            <div className={styles.InputGroupError}>
              {emailError.length > 0 && (
                <ul className={styles.errorList}>
                  {emailError.map((error, index) => (
                    <li className={styles.errorListItem} key={index}>
                      {error}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputGroupPrepend}>
                <span className={styles.inputGroupIcon}>
                  <FaLock />
                </span>
              </div>
              <input
                className={styles.passInput}
                placeholder="Password"
                name="password"
                type={!showLoginPassword ? "password" : "text"}
                defaultValue={loginData.password}
                onChange={onChangeLogin}
                disabled={loading}
                required
              />
              <span
                className={styles.passvisibile}
                onClick={() => {
                  if (loading) return;
                  setShowLoginPassword(!showLoginPassword);
                }}
              >
                {!showLoginPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {passwordError.length > 0 && (
              <ul className={styles.errorList}>
                {passwordError.map((error, index) => (
                  <li className={styles.errorListItem} key={index}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
            <button
              type="submit"
              className={styles.loginMainButton}
              disabled={loading}
            >
              {loading ? <span className={styles.loaderLogin}></span> : "LOGIN"}
            </button>
            <div className={styles.message}>
              <div className={styles.messageSpan}>
                <input type="checkbox" /> Remember Me
              </div>
              <div>
                <a href="#" className={styles.link}>
                  Forgot your password
                </a>
              </div>
            </div>
          </form>
          <div className={styles.login}>
            <span>Don&apos;t have an account?</span>
            <button
              className={styles.loginButton}
              onClick={() => router.push("/auth/signup")}
            >
              SIGNUP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
