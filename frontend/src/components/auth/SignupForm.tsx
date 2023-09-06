import React, { useState } from 'react';
import styles from '../../styles/components/auth/LoginForm.module.css';
import { FaUserCircle, FaLock, FaEyeSlash, FaEye  } from 'react-icons/fa';
import { MdEmail, MdClose } from 'react-icons/md';
import { useRouter } from 'next/router';

interface SignupFormProps {
  signupData: { email?: string; password?: string,password2?: string; };
  setSignupData: React.Dispatch<
    React.SetStateAction<{
      email?: string;
      password?: string;
      password2?: string;
    }>
  >;
  showSignupPassword: boolean; // Corrected type
  setShowSignupPassword: React.Dispatch<React.SetStateAction<boolean>>;
  signupError: any;
  setSignupError: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitSignup: () => Promise<void>;
}

const SignupForm: React.FC<SignupFormProps> = ({
  signupData,
  setSignupData,
  showSignupPassword,
  setShowSignupPassword,
  signupError,
  setSignupError,
  loading,
  setLoading,
  onSubmitSignup,
}) => {
  const [emailError, setEmailError] = useState<string[]>([]); 
  const [passwordError, setPasswordError] = useState<string[]>([]);  
  const router = useRouter();
  const onChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };


  const validateInputs = () => {
    setEmailError([]);
    setPasswordError([])
    setShowSignupPassword(false)
    setSignupError(null)
    
    if (!signupData.email) {
      setEmailError(['Email is required']);
      return false
    }

    if (!signupData.password) {
       setPasswordError(["Password is required"])
       return false
    }
    if (signupData.password !== signupData.password2){
      console.log("pass aint match")
      setPasswordError(["Passwords don't match"])
      return false
    }
    return true;

  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (validateInputs()) {
      await onSubmitSignup();
    }
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
        {signupError && (
             <> <MdClose 
             className={styles.errorDivIcon}   
             onClick={() => setSignupError(null)}
             />
               <div className={styles.errorDiv}
               >
                <span>{signupError}</span>
             
            </div>
             </>)}
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
            defaultValue= {signupData.email}
              onChange={onChangeSignup}
              disabled={loading}
              required
               />
            </div>
              
         
            <div className={styles.InputGroupError}>
            {emailError.length > 0 && ( 
  <ul className={styles.errorList}>
    {emailError.map((error, index) => (
      <li className={styles.errorListItem} key={index}>{error}</li>
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
               className={styles.input} 
             placeholder="Password"
             name="password"
             type={!showSignupPassword ? "password" : "text"}
             defaultValue={signupData.password}
             onChange={onChangeSignup}
             disabled={loading}
             required
               />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputGroupPrepend}>
                <span className={styles.inputGroupIcon}>
                  <FaLock />
                </span>
              </div> 
              <input   className={styles.passInput} 
                  placeholder="Confirm Password"
                  name="password2"
                  type={!showSignupPassword ? "password" : "text"}
                  defaultValue={signupData.password2}
                  onChange={onChangeSignup}
                  disabled={loading}
                  required
                  /><span
                  className={styles.passvisibile}  
                  onClick={() => {
                    if (loading) return;
                    setShowSignupPassword(!showSignupPassword)}}
                  
                  >
            
                {!showSignupPassword ?   <FaEye  /> :   <FaEyeSlash  /> }
           
                </span>
            </div>
            {passwordError.length > 0 && ( 
  <ul className={styles.errorList}>
    {passwordError.map((error, index) => (
      <li className={styles.errorListItem} key={index}>{error}</li>
    ))}
  </ul>
)}
            <button 
            type="submit"
             className={styles.signupMainButton}
             disabled={loading}
             >
              {loading?<span className={styles.loaderLogin}></span>:"SIGNUP"
              }
            </button>
            <div className={styles.message}>
               
              <div>
                <a href="#" className={styles.link}>
                  Forgot your password?
                </a>
              </div>
            </div>          
            </form>
          <div className={styles.signup}>
            <span>Already have an account?</span>
            <button className={styles.signupButton} onClick={() => router.push('/auth/login')}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
